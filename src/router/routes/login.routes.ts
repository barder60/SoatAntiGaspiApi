const bcrypt =  require('bcrypt')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const { ValidationError, UniqueConstraintError } = require('sequelize')