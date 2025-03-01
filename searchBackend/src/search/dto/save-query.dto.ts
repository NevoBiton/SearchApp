import { IsString, IsNotEmpty } from "class-validator";

export class SaveQueryDto {
    @IsString()
    @IsNotEmpty()
    query: string;
}