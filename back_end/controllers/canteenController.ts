import { Request, Response } from 'express'
import { getPool } from '../main'
import { jwtSign, jwtVerify } from '../services/jwtVerify'
import { getAuthorizationByHeader, getRandomString } from '../services/utils'
import type { MysqlError } from 'mysql'
import type { Food, JWTPayload, UserHistory, UserMoment } from '../models/types'
import randomGetFood from '../services/randomGetFood'
import { dataEncrypt } from '../services/crypto'


const testToken = (req: Request, res: Response) => {
  const payload: JWTPayload = {
    'amr': ['openid', 'name'],
    'iss': 'https://api.starjin.top/users',
    'aud': 'https://api.starjin.top/users/endpoint',
    'scope': ['openid', 'name', 'publicRead', 'publicWrite', 'db'],
    'username': 'test',
    'jid': getRandomString(16)
  }
  jwtSign(payload).then(token => res.json({token}))
  .catch(err => res.status(500).send(err))
}

const register = (req:Request, res: Response): void => {
    const {username, password} = req.body
    if (!username || !password) {
        res.status(400).json({code: 400, msg: 'MissingData'})
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
    const {username, password} = req.body
    if (!username || !password) {
        res.status(400).json({code: 400, msg: 'MissingData'})
        return
    }
    getPool().getConnection((err, connection) => {
        if (err) {
            return res.status(500).json({code: 500, msg: 'DatabaseError'})
        }
        connection.query(
          'SELECT username, canteens, preference FROM users WHERE username = ? AND password = ?',
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
                  'iss': 'https://api.starjin.top/users',
                  'aud': 'https://api.starjin.top/users/endpoint',
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
    const canteen = req.query.canteen
    if (!canteen){
        res.status(400).json({code: 400, msg: 'MissingData'})
        return
    }
    getPool().getConnection((err, connection) => {
        if (err) {
            return res.status(500).json({code: 500, msg: 'DatabaseError'})
        }
        connection.query('SELECT * FROM foods WHERE canteen = ?', [canteen], (err: MysqlError | null, results: Food[]) => {
            connection.release()
            if (err) {
                return res.status(500).json({code: 500, msg: 'DatabaseError'})
            }
            return res.json({code: 200, msg: 'Success', data: results})
        })
    })
}

const getMoments = (req: Request, res: Response) => {
    jwtVerify(getAuthorizationByHeader(req.headers.authorization)).then(payload => {
        if (!payload) return res.status(401).json({code: 401, msg: 'Unauthorized'})
        getPool().getConnection((err, connection) => {
            if (err) {
                return res.status(500).json({code: 500, msg: 'DatabaseError'}) 
            }
            connection.query('SELECT * FROM moment', (err: MysqlError | null, results: UserMoment[]) => {
                connection.release()
                if (err) {
                    return res.status(500).json({code: 500, msg: 'DatabaseError'}) 
                }
                return res.json({code: 200, msg: 'Success', data: results})
            })
        })
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
    })
}

const updatePreference = (req: Request, res: Response) => {
    jwtVerify(getAuthorizationByHeader(req.headers.authorization)).then(payload => {
        if (!payload) return res.status(401).json({code: 401, msg: 'Unauthorized'})
        const { preference } = req.body as {preference: string[]}
        if (!preference){
            return res.status(400).json({code: 400, msg: 'MissingData'})
        }
        getPool().getConnection((err, connection) => {
            if (err) {
                return res.status(500).json({code: 500, msg: 'DatabaseError'})
            }
            connection.query(`UPDATE user SET preference = ? WHERE username = ?`, 
              [preference, payload.username],
            (err: MysqlError | null) => {
                connection.release()
                if(err) {
                    return res.status(500).json({code: 500, msg: 'DatabaseError'})
                }
                return res.json({code: 200, msg: 'Success'})
            })
        })
    })
}

export default{
  testToken,
  register, login,
  getAllFoods, randomMeal,
  getDataByCanteen,
  getMoments, uploadMoments,
  updatePreference
}