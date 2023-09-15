FROM python:3.9

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED=1

WORKDIR /app/backend

COPY ./backend/requirements.txt /app/backend

RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r /app/backend/requirements.txt

COPY ./docker/backend/wsgi-entrypoint.sh /app/backend
COPY ./backend /app/backend

RUN ["chmod", "+x", "/app/backend/wsgi-entrypoint.sh"]

EXPOSE 8000

ENTRYPOINT [ "/app/backend/wsgi-entrypoint.sh" ]