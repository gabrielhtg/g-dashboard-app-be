import { Injectable } from '@nestjs/common';
import { createWorker } from 'tesseract.js';
import * as Sharp from 'sharp';
import { Response } from 'express';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GOcrBankService {
  constructor(private prismaService: PrismaService) {
  }

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

    return { data: data, rawData: data };
  }

  async proceedOcrAll(file: Express.Multer.File) {
    const worker = await createWorker(['eng', 'ind']);

    const values = [];
    const image = Sharp(file.buffer);
    const metadata = await image.metadata();
    const imageWidth = metadata.width;
    const imageHeight = metadata.height;

    const rectangles = [
      // judul bank statement
      {
        left: imageWidth * (10 / 100),
        top: imageHeight * (10 / 100),
        width: imageWidth * (80 / 100),
        height: imageHeight * (10 / 100),
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
      judul: values[0],
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

    return { data: values, rawData: data };
  }

  // convertFormattedStringToNumber(formattedString: string): number {
  //   // Remove commas from the string
  //   const cleanedString = formattedString.replace(/,/g, '');
  //
  //   // Parse the cleaned string as a float
  //   const number = parseFloat(cleanedString);
  //
  //   // Check if the conversion is valid
  //   if (isNaN(number)) {
  //     throw new Error('Invalid number format');
  //   }
  //
  //   return number;
  // }

  async saveOcrData(data: any, res: Response) {
    const updateResult = await this.prismaService.ocrResult.create({
      data: {
        result: data.result,
        uploaded_by: data.uploaded_by,
        total_file: data.total_file,
        bank_type: data.bank_type,
        error_message: data.error_message,
        link: data.link
      }
    })

    return res.status(200).json({
      message: 'OCR Data Saved',
      data: updateResult
    })
  }
}
