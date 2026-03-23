import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime


def handler(event, context):
    """Отправка заявки на обратный звонок на почту vostokinveststal@mail.ru"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token, X-Session-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    cors = {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}

    if event.get('httpMethod') != 'POST':
        return {'statusCode': 405, 'headers': cors, 'body': json.dumps({'error': 'Method not allowed'})}

    try:
        raw_body = event.get('body') or '{}'
        body = json.loads(raw_body) if isinstance(raw_body, str) else raw_body
    except (json.JSONDecodeError, TypeError):
        body = {}
    name = body.get('name', '').strip() if isinstance(body, dict) else ''
    phone = body.get('phone', '').strip() if isinstance(body, dict) else ''
    comment = body.get('comment', '').strip() if isinstance(body, dict) else ''

    if not name or not phone:
        return {'statusCode': 400, 'headers': cors, 'body': json.dumps({'error': 'name and phone are required'})}

    smtp_email = 'vostokinveststal@mail.ru'
    smtp_password = os.environ.get('SMTP_PASSWORD', '')

    now = datetime.now().strftime('%d.%m.%Y %H:%M')

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Заказали звонок — {name}'
    msg['From'] = smtp_email
    msg['To'] = smtp_email

    comment_text = f'\nКомментарий: {comment}' if comment else ''
    text = f'Заказали звонок\n\nИмя: {name}\nТелефон: {phone}{comment_text}\nДата и время заявки: {now}'

    comment_row = f"""
          <tr>
            <td style="padding:8px 0;color:#888;vertical-align:top;">Комментарий:</td>
            <td style="padding:8px 0;color:#333;">{comment}</td>
          </tr>""" if comment else ''

    html = f"""
    <div style="font-family:Arial,sans-serif;max-width:500px;margin:0 auto;padding:20px;">
      <div style="background:#8B6914;color:white;padding:16px 20px;border-radius:12px 12px 0 0;">
        <h2 style="margin:0;font-size:18px;">Заказали звонок</h2>
      </div>
      <div style="border:1px solid #e0e0e0;border-top:none;padding:20px;border-radius:0 0 12px 12px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:8px 0;color:#888;width:120px;">Имя:</td>
            <td style="padding:8px 0;font-weight:bold;color:#333;">{name}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#888;">Телефон:</td>
            <td style="padding:8px 0;font-weight:bold;color:#333;">{phone}</td>
          </tr>{comment_row}
          <tr>
            <td style="padding:8px 0;color:#888;">Дата и время заявки:</td>
            <td style="padding:8px 0;color:#333;">{now}</td>
          </tr>
        </table>
      </div>
      <p style="color:#aaa;font-size:12px;text-align:center;margin-top:16px;">Отправлено с сайта ВИС</p>
    </div>
    """

    msg.attach(MIMEText(text, 'plain', 'utf-8'))
    msg.attach(MIMEText(html, 'html', 'utf-8'))

    with smtplib.SMTP_SSL('smtp.mail.ru', 465) as server:
        server.login(smtp_email, smtp_password)
        server.sendmail(smtp_email, smtp_email, msg.as_string())

    return {
        'statusCode': 200,
        'headers': cors,
        'body': json.dumps({'success': True, 'message': 'Заявка отправлена'})
    }