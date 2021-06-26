/*function enviarEmail(name, email, telefone) {
    //Dentro de crase se chama Template Literals
    console.log(`Opa ${name} belo ${email} e seu tel é ${telefone}`)
}

enviarEmail("Warden", "warden@gmail", 1234)


/*************************************** 

interface Usuario {
    name: string,
    email: string,
    telefone: number
}

function enviarEmailTipado(user: Usuario) {
    console.log(`
        Olá ${user.name} seu email é ${user.email} e seu telefone é ${user.telefone}
    `)
}

enviarEmailTipado({
    name: "Warden",
    email: "Ward@gmail.com",
    telefone: 12345678
})

**************************************************************************
app.get("/test", (request, response) => {
    // Request = toda informação recebida
    // Response = toda informação devolvida

    return response.send("First route")
})

/**
 * Tipos de parametros.
 * Routes params => http://localhost:3000/produtos/123 
 * Query paramns => http://localhost:3000/produtos?name=teclado&description=topper
 * Body params => {
 *  "name": "teclado",
 *  "description": "topper"
 * }
 

 app.post('/', (request, response) => {
    return response.send("Hi")
})*/