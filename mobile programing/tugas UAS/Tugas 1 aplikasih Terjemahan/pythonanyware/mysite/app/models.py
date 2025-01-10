from . import db

class Indonesia(db.Model):
    __tablename__ = 'indonesia'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    kata_indonesia = db.Column(db.String, unique=True, nullable=False)

class Takimpo(db.Model):  # Mengganti nama model ke Takimpo
    __tablename__ = 'takimpo'  # Mengganti nama tabel ke takimpo
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    kata_takimpo = db.Column(db.String, unique=True, nullable=False)  # Menyesuaikan nama kolom jika perlu

class IndonesiaTakimpo(db.Model):  # Mengganti nama model hubungan
    __tablename__ = 'indonesia_takimpo'  # Mengganti nama tabel hubungan
    id_indonesia = db.Column(db.Integer, db.ForeignKey('indonesia.id', ondelete='CASCADE'), primary_key=True)
    id_takimpo = db.Column(db.Integer, db.ForeignKey('takimpo.id', ondelete='CASCADE'), primary_key=True)
