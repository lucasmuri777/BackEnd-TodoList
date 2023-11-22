import { Request, Response } from 'express'

import { Todo } from '../models/Todo';
import { constrainedMemory } from 'process';
import { json, Op } from 'sequelize';

export const getAll = async (req: Request, res: Response) =>{
    try{
        let todos = await Todo.findAll();
        res.json(todos);
    }
    catch(error){
        console.log(error);
    }

}

export const getByTitle = async (req: Request, res: Response) =>{
    try{   
        let title = req.params.title;
        let todos = await Todo.findAll({
            where:{
                title:{
                    [Op.like]: `%${title}%`
                }
            }
        });
        if(todos.length == 0){
            res.status(404);
            res.json({error: 'Not Found'});
            return;
        }
        res.json(todos);
    }
    catch(error){
        console.log(error);
        res.json({error});
    }
}

export const create = async (req: Request, res: Response) =>{
    try{
        let title = req.body.title;
        console.log(title);
        if(title.trim().length == 0){
            res.status(400);
            res.json({error: 'Bad Request'});
            return;
        }
        await Todo.create({
            title: title.trim()
        })
        res.status(201);
        res.json({message: 'Todo created!'});
    }
    catch(error){
        console.log(error);
        res.json({error});
    }
}

export const update = async (req: Request, res: Response) =>{
    let {title, done} = req.body; 
    if(title.trim().length == 0 || done == null){
        res.status(400);
        res.json({error: 'Bad Request'});
        return;
    }

    try{
        let todo = await Todo.findByPk(req.params.id);
        if(todo == null){
            res.status(404);
            res.json({error: 'Not Found'});
            return;
        }
        todo.update({
            title: title.trim(),
            done
        })
        res.json({message: 'Todo updated!'});
    }
    catch(error){
        console.log(error);
        res.json({error});
    }
}

export const deleteById = async (req: Request, res: Response) =>{
    try{
        let todo = await Todo.findByPk(req.params.id);
        if(todo == null){
            res.status(404);
            res.json({error: 'Not Found'});
            return;
        }
        todo.destroy();
        res.json({message: 'Todo deleted!'});
    }
    catch(error){
        console.log(error);
        res.json({error});
    }
}