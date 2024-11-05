import { Request, Response } from 'express'

const getAllUsers = (req: Request, res: Response) => {
  res.send('Getting all users.');
}

export default{
  getAllUsers
}