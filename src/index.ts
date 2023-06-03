import express, { Request, Response } from 'express'
import cors from 'cors'
import { accounts } from './database'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get("/ping", (req: Request, res: Response) => {
    res.send("Pong!")
})

//requisitando todas as contas
app.get("/accounts", (req: Request, res: Response) => {
    res.send(accounts)
})

// requisitando por id
app.get('/accounts/:id', (req: Request, res: Response) => {
    const {id} = req.params
    const result = accounts.filter((account) => {
        return account.id === id
    })
    res.status(200).send(result)
})

//deletando uma conta por id
app.delete('/accounts/:id', (req: Request, res: Response) => {
    
    const {id} = req.params

    const indexDoObjeto = accounts.findIndex((account) => {
        return account.id === id
    })

    //ternário checando pelo index do obj
    indexDoObjeto < 0 ? res.status(404).send('não foi') : (accounts.splice(indexDoObjeto, 1), res.status(200).send('deletou'))

})

//editando conta por id
app.put('/accounts/:id', (req: Request, res: Response) => {
    
    const {id} = req.params;
    
    const newId = req.body.id;

    const {ownerName, balance, type} = req.body

    // const newOwnerName = req.body.ownerName;
    // const newBalance = req.body.balance;
    // const newType = req.body.type;

    const accountFound = accounts.find((account) => {
        return account.id === id
    })

    if (accountFound) {

        accountFound.id = newId || accountFound.id;
        accountFound.ownerName = ownerName || accountFound.ownerName;
        accountFound.balance = balance || accountFound.balance;
        accountFound.type = type || accountFound.type;

    }

    res.status(200).send('Atualizado com sucesso')
})


// if (indexDoObjeto < 0 ) {
//     res.status(404).send('num tem esse id')
// } else {
//     accounts.splice(indexDoObjeto, 1)
//     res.status(200).send('deletou')
// }

// console.log(indexDoObjeto)