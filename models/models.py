# -*- coding: utf-8 -*-

from odoo import models, fields, api


class TodoTask(models.Model):
    _name = 'todo.task'
    _description = 'Todo APP tasks'

    name = fields.Char(required=True)
    is_completed = fields.Boolean()
    description = fields.Text()
