from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(["GET"])
def health(request):
    """Lightweight readiness probe for local tooling and the frontend."""
    return Response(
        {
            "status": "ok",
            "service": "nisse-backend",
            "api_version": "v1",
        }
    )
