class Car
  constructor: (@name) ->
  mil: 8100
  changeName: (@name = 'default') ->

class VW extends Car

car('VW')