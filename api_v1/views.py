from django.http import JsonResponse
from django.shortcuts import render
from django.views import View
import json


# KeyError ValueError
class AddView(View):
    def get(self, request, *args, **kwargs):
        try:
            a = float(request.GET.get("A"))
            b = float(request.GET.get("B"))
            response = JsonResponse({"answer": a + b})

        except KeyError:
            response = JsonResponse({"error": 'переданы некорректные данные'})
            response.status_code = 400
        except ValueError:
            response = JsonResponse({"error": 'переданы некорректные данные'})
            response.status_code = 400
        except TypeError:
            response = JsonResponse({"error": 'Данные не были переданы'})
            response.status_code = 400

        return response

    def post(self, request, *args, **kwargs):
        print(request.GET)

        if request.body.strip():
            data = json.loads(request.body)
            try:
                a = float(data["A"])
                b = float(data["B"])
                response = JsonResponse({"answer": a + b})

            except KeyError:
                response = JsonResponse({"error": 'переданы некорректные данные'})
                response.status_code = 400
            except ValueError:
                response = JsonResponse({"error": 'переданы некорректные данные'})
                response.status_code = 400

        else:
            response = JsonResponse({"error": 'Данные не были переданы'})
            response.status_code = 400

        return response
