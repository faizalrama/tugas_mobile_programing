from flask import Blueprint, jsonify, request
from .models import db

bp = Blueprint('main', __name__)

# Home (Untuk Mendapatkan Semua Bahasa)
@bp.route('/', methods=['GET'])
def home():
    q = """
        SELECT i.id AS id_indonesia, i.kata_indonesia AS bhs_indonesia, t.id AS id_takimpo, t.kata_takimpo AS bhs_takimpo
        FROM indonesia_takimpo up
        JOIN indonesia i ON up.id_indonesia = i.id
        JOIN takimpo t ON up.id_takimpo = t.id;
    """
    hasil = db.session.execute(q).fetchall()
    return jsonify([
        {
            'id_indonesia': row.id_indonesia,
            'id_takimpo': row.id_takimpo,
            'bhs_indonesia': row.bhs_indonesia,
            'bhs_takimpo': row.bhs_takimpo
        }
        for row in hasil
    ])

@bp.route('/translate', methods=['GET'])
def translate():
    # Ambil parameter input dan dari dari query
    input = request.args.get('q', '').strip()
    dari = request.args.get('from', '').strip()

    # Validasi input
    if not input:
        return jsonify({'message': 'Teks untuk diterjemahkan tidak boleh kosong!', 'data': []}), 400
    if not dari:
        return jsonify({'message': 'Bahasa asal (from) tidak boleh kosong!', 'data': []}), 400

    # Pemilihan query berdasarkan bahasa asal
    if dari == "Indonesia":
        query_id = 'SELECT id FROM indonesia WHERE kata_indonesia = :input'
        query_terjemah = """
            SELECT t.kata_takimpo AS terjemahan
            FROM indonesia_takimpo up
            JOIN takimpo t ON up.id_takimpo = t.id
            WHERE up.id_indonesia = :id
        """
    elif dari == "Takimpo":
        query_id = 'SELECT id FROM takimpo WHERE kata_takimpo = :input'
        query_terjemah = """
            SELECT i.kata_indonesia AS terjemahan
            FROM indonesia_takimpo up
            JOIN indonesia i ON up.id_indonesia = i.id
            WHERE up.id_takimpo = :id
        """
    else:
        return jsonify({'message': 'Bahasa asal tidak dikenali!', 'data': []}), 400

    # Eksekusi query untuk mendapatkan ID
    id_kata = db.session.execute(query_id, {'input': input}).fetchone()
    if not id_kata:
        return jsonify([{'terjemahan': "Tidak ada"}]), 404

    # Eksekusi query untuk mendapatkan terjemahan
    terjemahan = db.session.execute(query_terjemah, {'id': id_kata.id}).fetchone()
    if not terjemahan:
        return jsonify([{'terjemahan': "Tidak ada"}]), 404

    # Format hasil
    hasil = [{'terjemahan': terjemahan.terjemahan}]

    # Respons sukses
    return jsonify(hasil), 200
