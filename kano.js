class KanoFile {


    static MAGIC = new Uint8Array([
        0x4B, // K
        0x41, // A
        0x4E, // N
        0x4F  // O
    ]);


    static VERSION = 1;



    // تبدیل عدد به 2 بایت
    static uint16(value){

        return new Uint8Array([
            (value >> 8) & 0xff,
            value & 0xff
        ]);

    }



    // تبدیل عدد به 4 بایت
    static uint32(value){

        return new Uint8Array([

            (value >> 24) & 0xff,

            (value >> 16) & 0xff,

            (value >> 8) & 0xff,

            value & 0xff

        ]);

    }




    // ساخت فایل KANO
static async create(
    json,
    creator,
    telegram,
    password,
    flags
){


        /*
          Header
        */

        let headerObject = {};


        if(creator){

            headerObject.creator = creator;

        }


        if(telegram){

            headerObject.telegram = telegram;

        }



        let headerText =
            JSON.stringify(headerObject);



        let headerBytes =
            new TextEncoder()
            .encode(headerText);




        /*
          Encrypt Payload
        */


        let encrypted =
            await KanoCrypto.encrypt(
                json,
                password
            );



        let payload =
            encrypted.data;



        /*
          File Size
        */


        let totalSize =

            4 +       // Magic

            1 +       // Version

            1 +       // Flags

            2 +       // Header Length

            headerBytes.length +

            16 +      // Salt

            12 +      // IV

            4 +       // Payload Length

            payload.length;



        let file =
            new Uint8Array(totalSize);



        let offset = 0;



        /*
          Magic
        */

        file.set(
            this.MAGIC,
            offset
        );

        offset += 4;




        /*
          Version
        */

        file[offset] =
            this.VERSION;

        offset++;





        /*
          Flags

          Bit0 = Password protected
        */

        file[offset] = flags;

        offset++;





        /*
          Header Length
        */

        file.set(
            this.uint16(
                headerBytes.length
            ),
            offset
        );

        offset += 2;



        /*
          Header
        */

        file.set(
            headerBytes,
            offset
        );

        offset += headerBytes.length;



        /*
          Salt
        */

        file.set(
            encrypted.salt,
            offset
        );

        offset += 16;



        /*
          IV
        */

        file.set(
            encrypted.iv,
            offset
        );

        offset += 12;




        /*
          Payload Length
        */

        file.set(
            this.uint32(
                payload.length
            ),
            offset
        );

        offset += 4;



        /*
          Encrypted JSON
        */

        file.set(
            payload,
            offset
        );



        return file;


    }



}
