import { Injectable } from '@nestjs/common';
import { createWorker } from 'tesseract.js';
import * as Sharp from 'sharp';
import { cleanNik } from './cleaning-ktp/clean-nik.service';
import { cleanStringGeneral } from './cleaning-ktp/clean-string-general.service';
import { cleanTempatTanggalLahir } from './cleaning-ktp/clean-tempat-tanggal-lahir.service';
import { cleanProvinsiPembuatanService } from './cleaning-ktp/clean-provinsi-pembuatan.service';
import { cleanAgamaService } from './cleaning-ktp/clean-agama.service';
import { cleanPekerjaanService } from './cleaning-ktp/clean-pekerjaan.service';
import { cleanStatusPerkawinanService } from './cleaning-ktp/clean-status-perkawinan.service';
import { cleanOcrSelectionService } from './cleaning-ktp/clean-ocr-selection.service';
import * as fs from 'node:fs';
import { Response } from 'express';

@Injectable()
export class GOcrService {
  // melakukan OCR pada manual selection
  async proceedOcr(file: Express.Multer.File) {
    const worker = await createWorker('eng');
    let data = '';

    await (async () => {
      const {
        data: { text },
      } = await worker.recognize(file.buffer);
      data = text;
      await worker.terminate();
    })();

    return { data: cleanOcrSelectionService(data), rawData: data };
  }

  // Melakukan OCR berdasarkan region box
  async proceedOcrAll(file: Express.Multer.File) {
    const worker = await createWorker(['eng', 'ind']);

    const values = [];
    const image = Sharp(file.buffer);
    const metadata = await image.metadata();
    const imageWidth = metadata.width;
    const imageHeight = metadata.height;

    const rectangles = [
      // provinsi pembuatan
      {
        left: imageWidth * (15 / 100),
        top: imageHeight * (0 / 100),
        width: imageWidth * (62 / 100),
        height: imageHeight * (10 / 100),
      },
      // kota pembuatan
      {
        left: imageWidth * (15 / 100),
        top: imageHeight * (8 / 100),
        width: imageWidth * (56 / 100),
        height: imageHeight * (8 / 100),
      },
      // nik
      {
        left: imageWidth * (23 / 100),
        top: imageHeight * (13 / 100),
        width: imageWidth * (50 / 100),
        height: imageHeight * (10 / 100),
      },
      // nama
      {
        left: imageWidth * (23 / 100),
        top: imageHeight * (23 / 100),
        width: imageWidth * (45 / 100),
        height: imageHeight * (7 / 100),
      },
      // tempat tanggal lahir
      {
        left: imageWidth * (24 / 100),
        top: imageHeight * (28 / 100),
        width: imageWidth * (40 / 100),
        height: imageHeight * (7 / 100),
      },
      // jenis kelamin
      {
        left: imageWidth * (23 / 100),
        top: imageHeight * (32 / 100),
        width: imageWidth * (18 / 100),
        height: imageHeight * (6 / 100),
      },
      // golongan darah
      {
        left: imageWidth * (70 / 100),
        top: imageHeight * (32 / 100),
        width: imageWidth * (5 / 100),
        height: imageHeight * (7 / 100),
      },
      // Alamat
      {
        left: imageWidth * (24 / 100),
        top: imageHeight * (37 / 100),
        width: imageWidth * (48 / 100),
        height: imageHeight * (7 / 100),
      },
      // RT/RW
      {
        left: imageWidth * (24 / 100),
        top: imageHeight * (43 / 100),
        width: imageWidth * (10 / 100),
        height: imageHeight * (6 / 100),
      },
      // Kel/Desa
      {
        left: imageWidth * (23 / 100),
        top: imageHeight * (48 / 100),
        width: imageWidth * (28 / 100),
        height: imageHeight * (6 / 100),
      },
      // Kecamatan
      {
        left: imageWidth * (24 / 100),
        top: imageHeight * (51 / 100),
        width: imageWidth * (32 / 100),
        height: imageHeight * (5 / 100),
      },
      // Agama
      {
        left: imageWidth * (23 / 100),
        top: imageHeight * (53 / 100),
        width: imageWidth * (32 / 100),
        height: imageHeight * (7 / 100),
      },
      // Status Perkawinan
      {
        left: imageWidth * (24 / 100),
        top: imageHeight * (61 / 100),
        width: imageWidth * (28 / 100),
        height: imageHeight * (6 / 100),
      },
      // Pekerjaan
      {
        left: imageWidth * (23 / 100),
        top: imageHeight * (64 / 100),
        width: imageWidth * (40 / 100),
        height: imageHeight * (7 / 100),
      },
      // Kewarganegaraan
      {
        left: imageWidth * (24 / 100),
        top: imageHeight * (70 / 100),
        width: imageWidth * (10 / 100),
        height: imageHeight * (6 / 100),
      },
      // Berlaku Hingga
      {
        left: imageWidth * (24 / 100),
        top: imageHeight * (72 / 100),
        width: imageWidth * (20 / 100),
        height: imageHeight * (8 / 100),
      },
      // Dibuat Tanggal
      {
        left: imageWidth * (78 / 100),
        top: imageHeight * (71 / 100),
        width: imageWidth * (15 / 100),
        height: imageHeight * (6 / 100),
      },
    ];

    await (async () => {
      for (let i = 0; i < rectangles.length; i++) {
        const {
          data: { text },
        } = await worker.recognize(file.buffer, { rectangle: rectangles[i] });
        values.push(text);
      }

      await worker.terminate();
    })();

    const data = {
      provinsi_pembuatan: values[0],
      kota_pembuatan: values[1],
      nik: values[2],
      nama: values[3],
      tempat_tanggal_lahir: values[4],
      jenis_kelamin: values[5],
      gol_darah: values[6],
      alamat: values[7],
      rt_rw: values[8],
      kel_desa: values[9],
      kecamatan: values[10],
      agama: values[11],
      status_perkawinan: values[12],
      pekerjaan: values[13],
      kewarganegaraan: values[14],
      berlaku_hingga: values[15],
      tanggal_dibuat: values[16],
    };

    //cleaning data
    values[0] = cleanProvinsiPembuatanService(values[0]);
    values[1] = cleanStringGeneral(values[1]);
    values[2] = cleanNik(values[2]);
    values[3] = cleanStringGeneral(values[3]);
    values[7] = cleanStringGeneral(values[7]);
    values[15] = cleanStringGeneral(values[15]);
    values[11] = cleanAgamaService(values[11]);
    values[9] = cleanStringGeneral(values[9]);
    values[12] = cleanStatusPerkawinanService(values[12]);
    values[14] = cleanStringGeneral(values[14]);
    values[13] = cleanPekerjaanService(values[13]);
    values[4] = cleanTempatTanggalLahir(values[4]);

    if (!values[6]) {
      values[6] = '-';
    }

    if (values[5].toLowerCase().includes('ak')) {
      values[5] = 'LAKI-LAKI';
    } else if (values[5].toLowerCase().includes('emp')) {
      values[5] = 'PEREMPUAN';
    } else {
      values[5] = '-';
    }

    if (values[15].toLowerCase().includes('umu')) {
      values[15] = 'SEUMUR HIDUP';
    }

    if (values[13].toLowerCase().includes('mah')) {
      values[13] = 'PELAJAR/MAHASISWA';
    }

    return { data: values, rawData: data };
  }

  // mengekspor gambar ke dalam file pdf
  async exportPDF(file: Express.Multer.File, res: Response) {
    const worker = await createWorker(['eng', 'ind']);

    const values = [];

    await (async () => {
      const {
        data: { text, pdf },
      } = await worker.recognize(
        file.buffer,
        { pdfTitle: 'Example PDF' },
        { pdf: true },
      );
      fs.writeFileSync(
        `${__dirname}/../../static-file/tesseract-ocr-result.pdf`,
        Buffer.from(pdf),
      );
      values.push(text);

      await worker.terminate();
    })();

    // diarahkan ke url static files yang digenerate oleh OCR
    return res.status(200).json({
      data: 'http://localhost:3000/tesseract-ocr-result.pdf',
    });
  }
}
