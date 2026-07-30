class KanoCrypto {

    // -----------------------------
    // تولید بایت تصادفی
    // -----------------------------
    static randomBytes(length){

        const array = new Uint8Array(length);

        crypto.getRandomValues(array);

        return array;

    }


    // -----------------------------
    // Text -> Uint8Array
    // -----------------------------
    static encode(text){

        return new TextEncoder().encode(text);

    }


    // -----------------------------
    // Uint8Array -> Text
    // -----------------------------
    static decode(bytes){

        return new TextDecoder().decode(bytes);

    }


    // -----------------------------
    // تبدیل Uint8Array به Base64
    // فقط برای Debug
    // -----------------------------
    static toBase64(bytes){

        let binary="";

        bytes.forEach(b=>binary+=String.fromCharCode(b));

        return btoa(binary);

    }


    // -----------------------------
    // ساخت کلید AES از رمز کاربر
    // -----------------------------
    static async deriveKey(password,salt){

        const keyMaterial =
            await crypto.subtle.importKey(

                "raw",

                this.encode(password),

                "PBKDF2",

                false,

                ["deriveKey"]

            );


        return await crypto.subtle.deriveKey(

            {

                name:"PBKDF2",

                salt:salt,

                iterations:100000,

                hash:"SHA-256"

            },

            keyMaterial,

            {

                name:"AES-GCM",

                length:256

            },

            false,

            [

                "encrypt",

                "decrypt"

            ]

        );

    }



    // -----------------------------
    // رمزگذاری
    // -----------------------------
    static async encrypt(text,password){

        const salt =
            this.randomBytes(16);

        const iv =
            this.randomBytes(12);


        const key =
            await this.deriveKey(
                password,
                salt
            );


        const encrypted =
            await crypto.subtle.encrypt(

                {

                    name:"AES-GCM",

                    iv:iv

                },

                key,

                this.encode(text)

            );


        return{

            salt,

            iv,

            data:new Uint8Array(encrypted)

        };

    }



    // -----------------------------
    // رمزگشایی
    // -----------------------------
    static async decrypt(data,salt,iv,password){

        const key =
            await this.deriveKey(
                password,
                salt
            );


        const decrypted =
            await crypto.subtle.decrypt(

                {

                    name:"AES-GCM",

                    iv:iv

                },

                key,

                data

            );


        return this.decode(
            new Uint8Array(decrypted)
        );

    }

}
