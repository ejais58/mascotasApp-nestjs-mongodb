import { Injectable } from '@nestjs/common/decorators';
import { createClientAsync } from 'soap';

@Injectable()
export class NumberConversionWrapper{
    private url = 'https://www.dataaccess.com/webservicesserver/NumberConversion.wso?wsdl';

    async numberToWords(num: number): Promise<string> {
        const client = await createClientAsync(this.url);
        const response = await client.NumberToWordsAsync({ ubiNum: num });
        return response[0];
    }
}