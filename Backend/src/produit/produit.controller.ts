import { Body, Controller, Get, Post, UseInterceptors, UploadedFile, ParseIntPipe, Param, UseGuards, UploadedFiles, Patch, Delete } from '@nestjs/common';
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
      destination: './uploads', // Directory where files will be stored
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        callback(null, `images-${uniqueSuffix}${extname(file.originalname)}`);
      }
    })
  }))
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

  @Patch('update/:id')
  @UseInterceptors(FileInterceptor('images'))
  async updateProduit(
    @Param('id') id: number,
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Produit> {
    // Parser les valeurs correctement
    const dto = {
      ...body,
      prix: parseFloat(body.prix),
      stock: parseInt(body.stock),
      magasin_id: parseInt(body.magasin_id),
      avisUtilisateur_id: body.avisUtilisateur_id ? parseInt(body.avisUtilisateur_id) : undefined,
      imagePath: file ? file.filename : body.imagePath,
    };

    return this.appService.UpdateProduit(id, dto);
  }


  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getProduitById(@Param('id', ParseIntPipe) id: number): Promise<Produit> {
    return this.appService.getProduitById(id);
  }


  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteProduit(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.appService.deleteProduit(id);
  }


}