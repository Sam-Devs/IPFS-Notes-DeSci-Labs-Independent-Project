import math

class Point:
    def __init__(self, x=0.0, y=0.0):
        self.__x = x
        self.__y = y

    def get_x(self):
        return self.__x

    def get_y(self):
        return self.__y

    def distance(self, p):
        dx = self.__x - p.get_x()
        dy = self.__y - p.get_y()
        return math.sqrt(dx*dx + dy*dy)

    def isNearBy(self, p):
        return self.distance(p) < 5

    def __str__(self):
        return "(" + str(self.__x) + ", " + str(self.__y) + ")"
