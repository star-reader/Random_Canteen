import { Request, Response } from 'express'
import { getPool } from '../main'
import { jwtSign } from '../services/jwtVerify'
import { JWTPayload } from '../models/types'
import { getRandomString } from '../services/Utils'

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

export default{
  getAllUsers,
  testToken,
  register, login
}