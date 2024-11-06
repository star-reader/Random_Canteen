import { Request, Response } from 'express'
import { getPool } from '../main'
import { jwtSign, jwtVerify } from '../services/jwtVerify'
import { getAuthorizationByHeader, getRandomString } from '../services/Utils'
import type { MysqlError } from 'mysql'
import type { Food, JWTPayload, UserHistory } from '../models/types'
import randomGetFood from '../services/randomGetFood'

const getAllUsers = (req: Request, res: Response) => {
  res.send('Getting all users.');
}

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

const register = (req:Request, res: Response) => {
    const {username, password} = req.body
    if (!username || !password) {
        return res.status(400).json({code: 400, msg: 'MissingData'})
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
            connection.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password],( err, results) => {
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
        return res.status(400).json({code: 400, msg: 'MissingData'})
    }
    getPool().getConnection((err, connection) => {
        if (err) {
            return res.status(500).json({code: 500, msg: 'DatabaseError'})
        }
        connection.query(
          'SELECT username, canteens, preference FROM users WHERE username = ? AND password = ?',
          [username, password], (err, results) => {
            if (err) {
                connection.release()
            } else if (results.length === 0) {
                connection.release()
                return res.status(400).json({code: 400, msg: 'UserNotFound'})
            } else {
                connection.release()
                return res.json({code: 200, msg: 'Success', data: results[0]})
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
                    connection.query('SELECT * FROM history WHERE username = ?', [payload.username], (err: MysqlError | null, history_results: UserHistory[]) => {
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
    }).catch(e => res.status(401).json({code: 401, msg: 'Unauthorized'}))
}

export default{
  getAllUsers,
  testToken,
  register, login,
  getAllFoods,
  randomMeal
}