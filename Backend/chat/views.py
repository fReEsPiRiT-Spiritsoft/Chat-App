from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Chat
import json


@csrf_exempt
def chat_view(request):
    if request.method == 'GET':
        chats = Chat.objects.all().order_by('-created_at')
        data = [
            {
                "id": chat.id,
                "name": chat.name, 
                "message": chat.message, 
                "created_at": chat.created_at.isoformat()
            }
            for chat in chats
        ]
        return JsonResponse(data, safe=False)
    elif request.method == 'POST':
        body = json.loads(request.body)
        name = body.get('name')
        message = body.get('message')
        if not name or not message:
            return JsonResponse({'error': 'name or message required'}, status=400)
        chat = Chat.objects.create(name=name, message=message)
        return JsonResponse({
            "id": chat.id, 
            "name": chat.name, 
            "message": chat.message, 
            "created_at": chat.created_at.isoformat()
        })
