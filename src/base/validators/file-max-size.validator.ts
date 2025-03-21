// import { MaxFileSizeValidator as DefaultMaxFileSizeValidator } from '@nestjs/common';
// import { ProductFileType } from 'src/image/types/file.type';
// export class MaxFileSizeValidator extends DefaultMaxFileSizeValidator {
//   isValid(files?: ProductFileType | any): boolean {
//     const validations: boolean[] = [];
//     for (const file in files) {
//       for (const image of files[file]) {
//         validations.push(super.isValid(image));
//       }
//     }
//     return validations.every((item) => item);
//   }
// }
