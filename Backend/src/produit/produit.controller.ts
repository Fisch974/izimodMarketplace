import { Body, Controller, Get, Post, UseInterceptors, UploadedFile, ParseIntPipe, Param, UseGuards, UploadedFiles } from '@nestjs/common';
import { ProduitService } from './produit.service';
import { CreateProduitDto } from './create_Produit_dto';
import { Produit } from './produit.entity';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from 'src/authentification/jwt-auth.guard';

// Controller for managing products in a store
@Controller('produits')
export class ProduitController {
  constructor(private readonly appService: ProduitService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @UseInterceptors(FilesInterceptor('images', 5, {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        callback(null, `images-${uniqueSuffix}${extname(file.originalname)}`);
      }
    })
  }))

  @UseGuards(JwtAuthGuard)
  async createProduit(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: any
  ) {
    console.log('BODY ===>', body);
    console.log('FILES ===>', files);

    const imagePaths = files.map(file => file.filename);
    return this.appService.CreateProduit({
      ...body,
      imagePath: imagePaths[0],
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('magasin/:id')
  async getProduitsByMagasin(@Param('id', ParseIntPipe) magasinId: number) {
    const produits = await this.appService.getProduitByMagasinId(magasinId);
    return produits;
  }

}