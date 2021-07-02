import { NextFunction, Request, Response } from "express";

type Controller = (req: Request, res: Response, next?: NextFunction) => Promise<void> | void

export default function asController(controller: Controller) {
    return controller;
}