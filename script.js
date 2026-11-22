// ===== AREA SE 2: SCRIPT.JS =====
var HARGA_PAKET = {
  'kopi-susu-gula-aren': 75000,
  'kopi-seduh-dingin': 90000,
  'kotak-konsumsi-rapat': 150000
};
var KODE_PROMO = 'NGOFEEHEMAT';
var BATAS_DISKON_JUMLAH = 3;
var PERSEN_DISKON = 10;

function hargaPaketTerpilih(nilaiSelect) {
  var sebagaiAngka = parseInt(nilaiSelect, 10);
  if (!isNaN(sebagaiAngka) && sebagaiAngka > 0) return sebagaiAngka;
  return HARGA_PAKET[nilaiSelect] || 0;
}

function rupiah(n) {
  return 'Rp' + n.toLocaleString('id-ID');
}

function hitungTotal() {
  var elPaket = document.getElementById('paket');
  var elJumlah = document.getElementById('jumlah');
  var elKode = document.getElementById('kode-promo');
  var elHasil = document.getElementById('hasil');

  var hargaSatuan = hargaPaketTerpilih(elPaket.value);
  var jumlah = parseInt(elJumlah.value, 10);
  var kode = (elKode.value || '').trim().toUpperCase();

  if (!hargaSatuan) {
    elHasil.textContent = 'Pilih paket dulu.';
    return;
  }
  if (!jumlah || jumlah < 1) {
    elHasil.textContent = 'Masukkan jumlah pesanan (minimal 1).';
    return;
  }

  var hargaAwal = hargaSatuan * jumlah;
  var dapatDiskon = (kode === KODE_PROMO) || (jumlah >= BATAS_DISKON_JUMLAH);
  var potongan = dapatDiskon ? Math.round(hargaAwal * PERSEN_DISKON / 100) : 0;
  var totalAkhir = hargaAwal - potongan;

  elHasil.innerHTML =
    'Harga awal: ' + rupiah(hargaAwal) + '<br>' +
    'Diskon (' + (dapatDiskon ? PERSEN_DISKON + '%' : '0%') + '): -' + rupiah(potongan) + '<br>' +
    '<strong>Total bayar: ' + rupiah(totalAkhir) + '</strong>';
}

document.getElementById('tombol-hitung').addEventListener('click', hitungTotal);
