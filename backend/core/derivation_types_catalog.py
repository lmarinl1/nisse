"""Seed catalog of methodological Derivation Types (Tipos de deriva)."""

from __future__ import annotations

from typing import Any

# Stable kebab-case ids; Spanish product copy for name / inspiration / reference / prompt.
DERIVATION_TYPE_CATALOG: tuple[dict[str, str], ...] = (
    {
        "id": "ready-made",
        "name": "Ready Made",
        "inspiration": "Marcel Duchamp",
        "reference": "Estética relacional",
        "prompt": (
            "Busca algo que ya exista y conviértelo en materia de futuro. "
            "Toma un objeto, práctica, sistema o fenómeno existente —del pasado o del presente— "
            "y pregúntate qué futuro aparece cuando decides desplazar su significado, uso o contexto. "
            "No inventes desde cero: intervén aquello que ya está ahí."
        ),
    },
    {
        "id": "reprogramming-existing",
        "name": "Reprogramación de lo existente",
        "inspiration": "Rirkrit Tiravanija",
        "reference": "Estética relacional",
        "prompt": (
            "Toma una situación existente y cambia sus reglas de participación. "
            "Invita a imaginar una experiencia distinta sin determinar completamente cómo debe ocurrir. "
            "Explora qué futuros aparecen cuando las personas, los objetos o los sistemas pueden relacionarse de otra manera."
        ),
    },
    {
        "id": "historicized-styles-forms",
        "name": "Estilos y formas historizadas",
        "inspiration": "Jeff Koons",
        "reference": "Estética relacional",
        "prompt": (
            "Vuelve al pasado y úsalo como materia prima para diseñar posibilidades. "
            "Recupera una forma, estilo, práctica o símbolo histórico y pregúntate qué ocurre si lo introduces nuevamente en el futuro. "
            "No reproduzcas la historia: desplázala, contradícela o úsala para imaginar lo que todavía no existe."
        ),
    },
    {
        "id": "images-in-speed",
        "name": "Imágenes en velocidad",
        "inspiration": "Douglas Gordon",
        "reference": "Estética relacional",
        "prompt": (
            "Altera la velocidad con la que observas el fenómeno. "
            "Acelera aquello que parece lento y ralentiza aquello que normalmente pasa desapercibido. "
            "Detente en los detalles y busca qué cambia cuando modificas la velocidad de observación. "
            "Usa ese desplazamiento para descubrir señales del instante que viene."
        ),
    },
    {
        "id": "fashion-performance",
        "name": "Moda y performance",
        "inspiration": "Vanessa Beecroft",
        "reference": "Estética relacional",
        "prompt": (
            "Observa una tendencia y decide si quieres seguirla, tensionarla o desafiarla. "
            "Explora qué ocurre cuando ir contra la tendencia se convierte también en una forma de estar dentro de ella. "
            "Identifica los ciclos sociales que aparecen y utiliza esa tensión para imaginar las rutas que podría tomar el futuro."
        ),
    },
    {
        "id": "social-realities",
        "name": "Realidades sociales",
        "inspiration": "Santiago Sierra",
        "reference": "Estética relacional",
        "prompt": (
            "Introduce deliberadamente las condiciones sociales dentro de tu exploración. "
            "Pregunta quién tiene poder, quién queda fuera, quién se beneficia y quién carga con las consecuencias. "
            "Diseña futuros tomando posición frente a las estructuras sociales, políticas y éticas que hacen posible el problema que estás investigando."
        ),
    },
    {
        "id": "scale-impact",
        "name": "Impacto con la escala",
        "inspiration": "Doris Salcedo",
        "reference": "Estética relacional",
        "prompt": (
            "Cambia la escala del futuro que estás imaginando. "
            "Pregúntate qué ocurre si tu objeto transforma una persona, una familia, una comunidad, una ciudad o una sociedad completa. "
            "Amplía y reduce la escala deliberadamente hasta descubrir qué cambia, qué permanece y qué consecuencias aparecen en cada nivel."
        ),
    },
    {
        "id": "social-appropriation",
        "name": "Apropiación social",
        "inspiration": "Francis Alÿs",
        "reference": "Estética relacional",
        "prompt": (
            "Decide desde dónde quieres observar el fenómeno. "
            "Aléjate y analiza aquello que ocurre frente a ti; después entra en él y participa. "
            "Compara ambas posiciones y explora cómo cambia el futuro cuando el diseñador observa desde afuera o se convierte en parte del objeto que está intentando transformar."
        ),
    },
    {
        "id": "society-as-form-repertoire",
        "name": "Sociedad como repertorio de formas",
        "inspiration": "Rirkrit Tiravanija",
        "reference": "Estética relacional",
        "prompt": (
            "Observa las relaciones sociales como material de diseño. "
            "Identifica cómo las personas se organizan, colaboran, intercambian, se enfrentan y construyen significado. "
            "Después modifica deliberadamente esas relaciones y explora qué formas de sociedad podrían emerger. "
            "Pregúntate qué significa diseñar el futuro de la manera en que la humanidad se relaciona consigo misma."
        ),
    },
    {
        "id": "thing",
        "name": "Cosa",
        "inspiration": "La cosa como ilusión útil",
        "reference": "La delimitación del movimiento infinito",
        "prompt": (
            "Trata el fenómeno como si fuera una cosa: delimítalo, nómbralo y congélalo. "
            "Después cuestiona ese límite. Pregunta qué aparece cuando observas aquello que considerabas estable "
            "como un recorte temporal de algo que continúa moviéndose. "
            "Usa la idea de cosa para descubrir qué estás dejando fuera de tu objeto."
        ),
    },
    {
        "id": "process",
        "name": "Proceso",
        "inspiration": "El proceso como fundamento ontológico",
        "reference": "La delimitación del movimiento infinito",
        "prompt": (
            "Deja de mirar el objeto como algo terminado. "
            "Busca los procesos que lo producen, lo transforman y lo mantienen. "
            "Sigue las relaciones en movimiento y pregunta qué futuro emerge si diseñas sobre el cambio "
            "en lugar de diseñar sobre entidades aparentemente estables."
        ),
    },
    {
        "id": "focus",
        "name": "Enfoque",
        "inspiration": "El enfoque como estructura de la experiencia",
        "reference": "Conocimiento parcial del universo",
        "prompt": (
            "Elige deliberadamente qué parte del fenómeno vas a mirar. "
            "Acerca el foco hasta encontrar una experiencia local y concreta. "
            "Pregúntate qué futuro aparece desde esa posición y qué queda fuera de tu campo de visión. "
            "Después cambia el enfoque y observa cómo se transforma la interpretación."
        ),
    },
    {
        "id": "defocus",
        "name": "Desenfoque",
        "inspiration": "El desenfoque como metáfora de humildad cognitiva",
        "reference": "Conocimiento parcial del universo",
        "prompt": (
            "Deja de intentar comprender el sistema completo. "
            "Acepta deliberadamente aquello que no puedes conocer y trabaja desde esa incertidumbre. "
            "Observa qué posibilidades aparecen cuando renuncias a dominar el fenómeno "
            "y utilizas el desenfoque como una forma de estar atento a la complejidad."
        ),
    },
    {
        "id": "origin",
        "name": "Origen",
        "inspiration": "El origen del tiempo",
        "reference": "Conocimiento parcial del universo",
        "prompt": (
            "Retrocede hasta el origen que crees que explica el fenómeno. "
            "Después cuestiona ese origen: ¿qué información estás dejando fuera?, "
            "¿qué condiciones hicieron posible que apareciera?, ¿qué ocurre si existe otro comienzo posible? "
            "Explora el origen no como una respuesta definitiva, sino como una puerta hacia otras temporalidades."
        ),
    },
    {
        "id": "past",
        "name": "Pasado",
        "inspiration": "Reconstrucción del pasado como huella",
        "reference": "Fenómeno y perspectiva particular de universo",
        "prompt": (
            "No trates el pasado como un archivo al que puedes acceder directamente. "
            "Busca las huellas que permanecen en el presente y reconstruye desde ellas aquello que pudo haber ocurrido. "
            "Pregunta qué recuerdos, registros, rastros o interpretaciones producen la versión del pasado "
            "que estás utilizando para diseñar el futuro."
        ),
    },
    {
        "id": "present",
        "name": "Presente",
        "inspiration": "Una experiencia local dependiente",
        "reference": "Fenómeno y perspectiva particular de universo",
        "prompt": (
            "Detente en el ahora y cuestiona su aparente universalidad. "
            "Observa desde dónde estás experimentando el presente, qué información tienes disponible "
            "y con qué sistemas estás interactuando. "
            "Después cambia de posición y pregunta cómo podría cambiar ese “ahora”. "
            "Diseña el futuro desde distintas experiencias locales del presente."
        ),
    },
    {
        "id": "future",
        "name": "Futuro",
        "inspiration": "El futuro como posibilidad proyectada",
        "reference": "Fenómeno y perspectiva particular de universo",
        "prompt": (
            "No intentes descubrir un futuro único. "
            "Proyecta posibilidades desde el presente que estás habitando. "
            "Imagina distintos futuros que podrían emerger de las decisiones actuales "
            "y pregúntate cuáles deseas provocar, cuáles quieres evitar y cuáles todavía no puedes imaginar. "
            "Trata el futuro como un espacio abierto de posibilidades, no como una predicción."
        ),
    },
    {
        "id": "decisions-intentions",
        "name": "Decisiones / Intenciones",
        "inspiration": (
            "Decidir es operar en condiciones de incertidumbre, desde un presente parcial, "
            "con memoria reconstruida, hacia un futuro incierto."
        ),
        "reference": "Intervención desde la incertidumbre",
        "prompt": (
            "Identifica una decisión que pueda modificar la trayectoria del sistema. "
            "Tómala sin esperar a conocer todas las variables y explora qué posibilidades abre. "
            "Pregunta qué ocurre cuando una intención interviene sobre un futuro que todavía no está determinado. "
            "Usa la incertidumbre no como una barrera, sino como el espacio donde una posibilidad puede comenzar a existir."
        ),
    },
)

DERIVATION_TYPE_IDS: frozenset[str] = frozenset(t["id"] for t in DERIVATION_TYPE_CATALOG)

_CATALOG_BY_ID: dict[str, dict[str, str]] = {t["id"]: t for t in DERIVATION_TYPE_CATALOG}


def list_derivation_types() -> list[dict[str, str]]:
    return [dict(t) for t in DERIVATION_TYPE_CATALOG]


def resolve_derivation_types(type_ids: list[str]) -> list[dict[str, str]]:
    resolved: list[dict[str, str]] = []
    for tid in type_ids:
        entry = _CATALOG_BY_ID.get(tid)
        if entry:
            resolved.append(dict(entry))
    return resolved


def catalog_as_api_payload() -> list[dict[str, Any]]:
    return list_derivation_types()
