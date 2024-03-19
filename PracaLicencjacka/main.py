import os.path

from flask import Flask, render_template, request, session, redirect, url_for
import json
from os import path, getenv
from dotenv import set_key
from secrets import token_urlsafe

app = Flask(__name__)
# Generowanie sekretnego klucza do szyfrowania ciasteczek w sesji
env_path = path.join(os.path.dirname(os.path.abspath(__file__)), '.env')
if not path.exists(env_path):
    with app.app_context():
        set_key(env_path, "SECRET_KEY", token_urlsafe(24))

app.secret_key = getenv("SECRET_KEY")

with open('pytania.json', encoding='utf-8') as f:
    questions = json.load(f)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/dangerous')
def dangerous():
    return render_template('dangerous.html')


@app.route('/passwordStorage')
def passwordStorage():
    return render_template('passwordStorage.html')


@app.route('/checkAndGeneratePassword')
def checkAndGeneratePassword():
    return render_template('checkAndGeneratePassword.html')


@app.route('/strongPassword')
def strongPassword():
    return render_template('strongPassword.html')


@app.route('/quiz')
def quiz():
    if 'score' not in session:
        session['score'] = 0
    if 'question_number' not in session:
        session['question_number'] = 0
    question_number = session['question_number']
    question = questions[question_number]
    return render_template('quiz.html', question=question, question_number=question_number, enumerate=enumerate)


@app.route('/submit', methods=['POST'])
def submit():
    question_number = session['question_number']
    user_answer = request.form.get(str(questions[question_number]['id']))
    if user_answer is not None and int(user_answer) == questions[question_number]['answer']:
        session['score'] += 1
    question_number += 1
    if question_number < len(questions):
        session['question_number'] = question_number
        return redirect(url_for('quiz'))
    else:
        score = session['score']
        session.clear()
        return render_template('result.html', score=score, total=len(questions))


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")
