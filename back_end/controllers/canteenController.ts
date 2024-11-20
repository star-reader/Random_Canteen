import { Request, Response } from 'express'
import { getPool, MAX_LOAD_PRE_PAGE } from '../main'
import { jwtSign, jwtVerify } from '../services/jwtVerify'
import { getAuthorizationByHeader, getRandomString } from '../services/utils'
import type { MysqlError } from 'mysql'
import type { Food, JWTPayload, UserHistory, UserMoment } from '../models/types'
import randomGetFood from '../services/randomGetFood'
import authorization from '../services/authorization'
import { dataDecrypt } from '../services/crypto'



const register = (req:Request, res: Response): void => {
    const {username, password, key, offset} = req.body
    const keyPairId = req.body['key-pair-id']
    const inviteCode = req.body.inviteCode
    if (!username || !password || !key || !keyPairId || !offset || !inviteCode) {
        res.status(400).json({code: 400, msg: 'MissingData'})
        return
    }
    if (inviteCode !== '537Usagi21'){
        res.status(401).json({code: 401, msg: 'Unauthorized'})
        return
    }
    // 进行授权校验
    if (!authorization(key, keyPairId, offset)){
        res.status(401).json({code: 401, msg: 'Unauthorized'})
        return
    }
    try {
        let _password = dataDecrypt(password)
        if (!_password || _password.length == 0){
            res.status(401).json({code: 401, msg: 'Unauthorized'})
            return
        }
    } catch (error) {
        res.status(401).json({code: 401, msg: 'Unauthorized'})
        return
    }
    getPool().getConnection((err, connection) => {
        if (err) {
            return res.status(500).json({code: 500, msg: 'DatabaseError'})
        }
        connection.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
            if (err) {
                connection.release()
                return res.status(500).json({code: 500, msg: 'DatabaseError'})
            }
            if (results.length > 0) {
                connection.release()
                return res.status(400).json({code: 400, msg: 'UserExists'})
            }
            // 对密码加密
            connection.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password],(err) => {
                connection.release()
                if (err) {
                    return res.status(500).json({code: 500, msg: 'DatabaseError'})
                }
                return res.json({code: 200, msg: 'Success'})
              })
        })
    })
}

const login = (req:Request, res: Response) => {
    const {username, password, key, offset} = req.body
    const keyPairId = req.body['key-pair-id']
    if (!username || !password || !key || !keyPairId || !offset) {
        res.status(400).json({code: 400, msg: 'MissingData'})
        return
    }
    if (!authorization(key, keyPairId, offset)){
        res.status(401).json({code: 401, msg: 'Unauthorized'})
        return
    }
    getPool().getConnection((err, connection) => {
        if (err) {
            return res.status(500).json({code: 500, msg: 'DatabaseError'})
        }
        connection.query(
          'SELECT username, avatar, canteens, mbti FROM users WHERE username = ? AND password = ?',
          [username, password], (err, results) => {
            connection.release()
            if (err) {
                return res.status(500).json({code: 500, msg: 'DatabaseError'})
            } else if (results.length === 0) {
                return res.status(400).json({code: 400, msg: 'UserNotFound'})
            } else {
                // 签发JWT
                const payload: JWTPayload = {
                  'amr': ['openid', 'name'],
                  'iss': 'https://api.usagi-jin.top/users',
                  'aud': 'https://api.usagi-jin.top/users/endpoint',
                  'scope': ['openid', 'name', 'publicRead', 'publicWrite', 'db'],
                  'username': username,
                  'jid': getRandomString(16)
                }
                jwtSign(payload).then(token => res.json({code: 200, msg: 'Success', data: results[0], token}))
                .catch(_ => res.status(500).json({code: 500, msg: 'JWTError'}))
              }
        })
    })
}

const getAllFoods = (req: Request, res: Response) => {
    jwtVerify(getAuthorizationByHeader(req.headers.authorization)).then(payload => {
        if (!payload) return res.status(401).json({code: 401, msg: 'Unauthorized'})
        getPool().getConnection((err, connection) => {
            if (err) {
                return res.status(500).json({code: 500, msg: 'DatabaseError'})
            }
            connection.query('SELECT * FROM foods', (err, results) => {
                connection.release()
                if (err) {
                    return res.status(500).json({code: 500, msg: 'DatabaseError'})
                }
                return res.json({code: 200, msg: 'Success', data: results})
            })
        })
    }).catch(e => res.status(401).json({code: 401, msg: 'Unauthorized'}))
    
}

const randomMeal = (req: Request, res: Response) => {
    jwtVerify(getAuthorizationByHeader(req.headers.authorization)).then(payload => {
        if (!payload) return res.status(401).json({code: 401, msg: 'Unauthorized'})
        const { selfRule } = req.body
        getPool().getConnection((err, connection) => {
            if (err) {
                return res.status(500).json({code: 500, msg: 'DatabaseError'})
            }
            connection.query('SELECT * FROM foods', (err: MysqlError | null, results: Food[]) => {
                // connection.release()
                if (err) {
                    return res.status(500).json({code: 500, msg: 'DatabaseError'})
                }
                //如果selfRoute里有noRecent，则从数据库history中筛选前几次吃过的饭，一并传入随机数选择函数，否则直接进行选择
                if (selfRule && selfRule.noRecent) {
                    connection.query('SELECT * FROM history WHERE username = ?', [payload.username],
                      (err: MysqlError | null, history_results: UserHistory[]) => {
                        connection.release()
                        if (err) {
                            return res.status(500).json({code: 500, msg: 'DatabaseError'})
                        }
                        const foods = randomGetFood(results, selfRule, history_results)
                        return res.json({code: 200, data: foods})
                    })
                }else{
                    connection.release()
                    const foods = randomGetFood(results, selfRule)
                    return res.json({code: 200, data: foods})
                }
            })
        })
    }).catch(_ => res.status(401).json({code: 401, msg: 'Unauthorized'}))
}

// 用于根据食堂名称获取实时情况
const getDataByCanteen = (req: Request, res: Response) => {
    jwtVerify(getAuthorizationByHeader(req.headers.authorization)).then(payload => {
        if (!payload) return res.status(401).json({code: 401, msg: 'Unauthorized'})
        getPool().getConnection((err, connection) => {
            if (err) {
                return res.status(500).json({code: 500, msg: 'DatabaseError'}) 
            }
            const canteen = req.query.canteen
            if (!canteen) return res.status(400).json({code: 400, msg: 'BadRequest'})
            connection.query('SELECT * FROM foods WHERE canteen = ?',[canteen], (err: MysqlError | null, results: UserMoment[]) => {
                connection.release()
                if (err) {
                    return res.status(500).json({code: 500, msg: 'DatabaseError'}) 
                }
                return res.json({code: 200, msg: 'Success', data: results})
            })
        })
    }).catch(_ => {
        return res.status(401).json({code: 401, msg: 'Unauthorized'})
    })
}

const getMoments = (req: Request, res: Response) => {
    jwtVerify(getAuthorizationByHeader(req.headers.authorization)).then(payload => {
        if (!payload) return res.status(401).json({code: 401, msg: 'Unauthorized'})
        let page = parseInt(req.query.page as string)
        if (!page){
            page = 1
        }
        getPool().getConnection((err, connection) => {
            if (err) {
                return res.status(500).json({code: 500, msg: 'DatabaseError'}) 
            }
            const min = (page - 1)*MAX_LOAD_PRE_PAGE;
            const max = min + MAX_LOAD_PRE_PAGE;
            connection.query(`SELECT * FROM moment ORDER BY id DESC LIMIT ${min},${max}`, (err: MysqlError | null, results: UserMoment[]) => {
                connection.release()
                if (err) {
                    return res.status(500).json({code: 500, msg: 'DatabaseError'}) 
                }
                return res.json({code: 200, msg: 'Success', data: results})
            })
        })
    }).catch(_ => {
        return res.status(401).json({code: 401, msg: 'Unauthorized'})
    })
}

const getAllMoments = (req: Request, res: Response) => {
    jwtVerify(getAuthorizationByHeader(req.headers.authorization)).then(payload => {
        if (!payload) return res.status(401).json({code: 401, msg: 'Unauthorized'})
        getPool().getConnection((err, connection) => {
            if (err) {
                return res.status(500).json({code: 500, msg: 'DatabaseError'})
            }
            connection.query(`SELECT * FROM moment`, (err: MysqlError | null, results: UserMoment[]) => {
                connection.release()
                if (err) {
                    return res.status(500).json({code: 500, msg: 'DatabaseError'}) 
                }
                return res.json({code: 200, msg: 'Success', data: results})
            })
        })
    }).catch(_ => {
        return res.status(401).json({code: 401, msg: 'Unauthorized'})
    })
}

const getQueryMoments = (req: Request, res: Response) => {
    jwtVerify(getAuthorizationByHeader(req.headers.authorization)).then(payload => {
        if (!payload) return res.status(401).json({code: 401, msg: 'Unauthorized'})
        const q = req.query.q
        if (!q) return res.status(400).json({code: 400, msg: 'BadRequest'})
        getPool().getConnection((err, connection) => {
            if (err) {
                return res.status(500).json({code: 500, msg: 'DatabaseError'})
            }
            connection.query(`SELECT * FROM moment WHERE title LIKE CONCAT('%',?, '%') OR canteen LIKE CONCAT('%',?, '%') OR tags LIKE CONCAT('%',?, '%') ORDER BY id DESC LIMIT 10`,
                [q,q,q], (err: MysqlError | null, results: UserMoment[]) => {
                connection.release()
                if (err) {
                    return res.status(500).json({code: 500, msg: 'DatabaseError'}) 
                }
                return res.json({code: 200, msg: 'Success', data: results})
            })
        })
    }).catch(_ => {
        return res.status(401).json({code: 401, msg: 'Unauthorized'})
    })
}

const getMomentsNumber = (req: Request, res: Response) => {
    jwtVerify(getAuthorizationByHeader(req.headers.authorization)).then(payload => {
        if (!payload) return res.status(401).json({code: 401, msg: 'Unauthorized'})
        getPool().getConnection((err, connection) => {
            if (err) {
                return res.status(500).json({code: 500, msg: 'DatabaseError'})
            }
            connection.query('SELECT COUNT(*) FROM moment', (err: MysqlError | null, results: any[]) => {
                connection.release()
                if (err){
                    return res.status(500).json({code: 500, msg: 'DatabaseError'})
                }
                return res.json({code: 200, msg: 'Success', data: results[0]['COUNT(*)']})
            })
        })
    }).catch(_ => res.status(401).json({code: 401, msg: 'Unauthorized'}))
}

const getFoodById = (req: Request, res: Response) => {
    jwtVerify(getAuthorizationByHeader(req.headers.authorization)).then(payload => {
        if (!payload) return res.status(401).json({code: 401, msg: 'Unauthorized'})
        const { id } = req.query
        if (!id){
            res.status(400).json({code: 400, msg: 'MissingData'})
            return
        }
        getPool().getConnection((err, connection) => {
            if (err) {
                res.status(500).json({code: 500, msg: 'DatabaseError'})
                return
            }
            connection.query('SELECT * FROM foods WHERE id = ?', [id], (err: MysqlError | null, results: Food[]) => {
                connection.release()
                if (err) {
                    return res.status(500).json({code: 500, msg: 'DatabaseError'})
                }
                if (!results || !results.length || !results[0]){
                    return res.status(404).json({code: 404, msg: 'NotFound'})
                }
                return res.json({code: 200, msg: 'Success', data: results[0]})
            })
        })
    }).catch(_ => {
        return res.status(401).json({code: 401, msg: 'Unauthorized'})
    })
}

const uploadMoments = (req: Request, res: Response) => {
    jwtVerify(getAuthorizationByHeader(req.headers.authorization)).then(payload => {
        if (!payload) return res.status(401).json({code: 401, msg: 'Unauthorized'})
        const { upload } = req.body as {upload: UserMoment}
        if (!upload || Object.keys(upload).length === 0){
            res.status(400).json({code: 400, msg: 'MissingData'})
            return
        }
        getPool().getConnection((err, connection) => {
            if (err) {
                return res.status(500).json({code: 500, msg: 'DatabaseError'})
            }
            connection.query(`INSERT INTO moment
              (username,food_id, title, content, picaddress, ranking, queue, time, canteen, tags) VALUES (?, ?,?, ?, ?, ?, ?, ?, ?,?)`, 
              [payload.username,upload.food_id, upload.title, upload.content, upload.picaddress ? upload.picaddress : '', 
                upload.ranking,upload.queue, upload.time, upload.canteen, upload.tags],
            (err: MysqlError | null) => {
                connection.release()
                if(err) {
                    console.log(err)
                    return res.status(500).json({code: 500, msg: 'DatabaseError'})
                }
                return res.json({code: 200, msg: 'Success'})
            })
        })
    }).catch(_ => {
        return res.status(401).json({code: 401, msg: 'Unauthorized'})
    })
}

const updatePreference = (req: Request, res: Response) => {
    jwtVerify(getAuthorizationByHeader(req.headers.authorization)).then(payload => {
        if (!payload) return res.status(401).json({code: 401, msg: 'Unauthorized'})
        const { preference } = req.body as {preference: string}
        if (!preference){
            return res.status(400).json({code: 400, msg: 'MissingData'})
        }
        getPool().getConnection((err, connection) => {
            if (err) {
                return res.status(500).json({code: 500, msg: 'DatabaseError'})
            }
            connection.query(`UPDATE users SET mbti = ? WHERE username = ?`, 
              [preference, payload.username],
            (err: MysqlError | null) => {
                connection.release()
                if(err) {
                    return res.status(500).json({code: 500, msg: 'DatabaseError'})
                }
                return res.json({code: 200, msg: 'Success'})
            })
        })
    }).catch(_ => {
        return res.status(401).json({code: 401, msg: 'Unauthorized'})
    })
}

const uploadHistory = (req: Request, res: Response) => {
    jwtVerify(getAuthorizationByHeader(req.headers.authorization)).then(payload => {
        if (!payload) return res.status(401).json({code: 401, msg: 'Unauthorized'})
        const { history } = req.body as {history: UserHistory}
        if (!history){
            return res.status(400).json({code: 400, msg: 'MissingData'})
        }
        getPool().getConnection((err, connection) => {
            if (err) {
                return res.status(500).json({code: 500, msg: 'DatabaseError'})
            }
            connection.query(`INSERT INTO history (time, username, canteen, food_id, ranking) VALUES (?, ?, ?, ?, ?)`, 
              [history.time, payload.username, history.canteen, history.food_id, history.ranking],
            (err: MysqlError | null) => {
                connection.release()
                if(err) {
                    return res.status(500).json({code: 500, msg: 'DatabaseError'})
                }
                return res.json({code: 200, msg: 'Success'})
            })
        })
    }).catch(_ => {
        return res.status(401).json({code: 401, msg: 'Unauthorized'})
    })
}

const getHistory = (req: Request, res: Response) => {
    jwtVerify(getAuthorizationByHeader(req.headers.authorization)).then(payload => {
        if (!payload) return res.status(401).json({code: 401, msg: 'Unauthorized'})
        getPool().getConnection((err, connection) => {
            if (err) {
                return res.status(500).json({code: 500, msg: 'DatabaseError'})
            }
            const listView = req.query.listView as string | undefined
            connection.query(listView ? `SELECT * FROM history WHERE username = ? LIMIT 10` : `SELECT * FROM history WHERE username = ?`,[payload.username], 
            (err: MysqlError | null, result: UserHistory[]) => {
                connection.release()
                if(err) {
                    return res.status(500).json({code: 500, msg: 'DatabaseError'})
                }
                return res.json({code: 200, msg: 'Success', data: result})
            })
        })
    }).catch(_ => {
        return res.status(401).json({code: 401, msg: 'Unauthorized'})
    })
}

const uploadAvatar = (req: Request, res: Response) => {
    jwtVerify(getAuthorizationByHeader(req.headers.authorization)).then(payload => {
        if (!payload) return res.status(401).json({code: 401, msg: 'Unauthorized'})
        const { url } = req.body as {url: string}
        if (!url){
            return res.status(400).json({code: 400, msg: 'MissingData'})
        }
        getPool().getConnection((err, connection) => {
            if (err) {
                return res.status(500).json({code: 500, msg: 'DatabaseError'})
            }
            connection.query(`UPDATE users SET avatar = ? WHERE username = ?`,[url, payload.username], 
            (err: MysqlError | null) => {
                connection.release()
                if(err) {
                    return res.status(500).json({code: 500, msg: 'DatabaseError'})
                }
                return res.json({code: 200, msg: 'Success'})
            })
        })
    }).catch(_ => {
        return res.status(401).json({code: 401, msg: 'Unauthorized'})
    })
}


export default {
  register, login,
  getAllFoods, randomMeal,
  getDataByCanteen,
  getMoments, uploadMoments,
  updatePreference,
  uploadHistory, getHistory,
  getFoodById, uploadAvatar,
  getMomentsNumber,
  getAllMoments,
  getQueryMoments
}