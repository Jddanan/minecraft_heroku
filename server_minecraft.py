import os
from os import environ as env
from sys import argv

import bottle
from bottle import default_app, request, route, response, get, static_file, template

DEBUG = os.environ.get("DEBUG")

bottle.debug(True)

@route('/')
def index():
    return template("index.html", root='')


@route('/css/<filename:re:.*css>')
def css(filename):
    return static_file(filename, root='css')


@route('/js/<filename:re:.*js>')
def js(filename):
    return static_file(filename, root='js')


@route('/images/<filename>')
def images(filename):
    return static_file(filename, root='images')


@route('/sound/<filename>')
def sound(filename):
    return static_file(filename, root='sound')


if DEBUG:
    bottle.run(host='localhost', port=7000)
else:
    bottle.run(host='0.0.0.0', port=argv[1])
