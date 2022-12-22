require('dotenv').config()

const { MongoClient, ObjectId } = require('mongodb')

const uri = process.env.MONGODB_URI
const client = new MongoClient(uri)

const dbname = 'bank'
const collection_name = 'accounts'

const accountsCollection = client.db(dbname).collection(collection_name)

const connectToDatabase = async () => {
  try {
    await client.connect()
    console.log(`Connected to the ${dbname} database 🌎 \nFull connection string: \n${uri}`)
  } catch (error) {
    console.log(`Error connecting to the database: ${error}`)
  }
}

const sampleAccount = {
  account_id: 'MDB829001337',
  account_holder: 'Linus Torvalds',
  account_type: 'checking',
  balance: 50352434,
  last_updated: new Date()
}

const sampleAccounts = [
  {
    account_id: 'MDB011235813',
    account_holder: 'Ada Lovelace',
    account_type: 'checking',
    balance: 60218,
    last_updated: new Date()
  },
  {
    account_id: 'MDB829000001',
    account_holder: 'Muhammad ibn Musa ak-Khwarizmi',
    account_type: 'saving',
    balance: 267914296,
    last_updated: new Date()
  }
]

const documentsToFind = { balance: { $gt: 4700 } }
const documentsToFindOne = { _id: ObjectId('639d9a3db8d61decbe35d8b1') }

const documentsToUpdate0 = { _id: ObjectId('639d9a3db8d61decbe35d8b1') }
const update0 = { $inc: { balance: 100 } }

const documentsToUpdate1 = { account_type: 'checking' }
const update1 = { $push: { transfers_complete: 'TR413308000' } }

const documentsToDelete0 = { _id: ObjectId('639da8cb03e4a954a031d8fc') }
const documentsToDelete1 = { account_type: 'test' }

const main = async () => {
  try {
    await connectToDatabase()

    // insertOne()
    // let result0 = await accountsCollection.insertOne(sampleAccount)
    // console.log(`Inseted document: ${result0.insertedId}`)
    // console.log(result0)

    // insertMany()
    // let result1 = await accountsCollection.insertMany(sampleAccounts)
    // console.log(`Inseted ${result1.insertedCount} documents`)
    // console.log(result1)

    // findOne()
    // let result2 = accountsCollection.findOne(documentsToFindOne)
    // console.log(await result2)
    // console.log('Found one document')

    // find()
    // let result3 = accountsCollection.find(documentsToFind)
    // let docCount = accountsCollection.countDocuments(documentsToFind)
    // await result3.forEach(doc => console.log(doc))
    // console.log(`Found ${await docCount} documents`)

    // updateOne()
    // let result4 = await accountsCollection.updateOne(documentsToUpdate0, update0)
    // result4.modifiedCount == 1 ? console.log('Updated one document') : console.log('No documents updated')

    // updateMany()
    // let result5 = await accountsCollection.updateMany(documentsToUpdate1, update1)
    // result5.modifiedCount > 0 ? console.log(`Updated ${result5.modifiedCount} documents`) : console.log('No documents updated')

    // deleteOne()
    // let result6 = await accountsCollection.deleteOne(documentsToDelete0)
    // result6.deletedCount == 1 ? console.log(`Deleted one document`) : console.log('No documents deleted')

    // deleteMany()
    // let result7 = await accountsCollection.deleteMany(documentsToDelete1)
    // result7.deletedCount > 0 ? console.log(`Deleted ${result7.deletedCount} documents`) : console.log('No documents deleted')
  } catch (error) {
    console.log(`Error inserting document: ${error}`)
  } finally {
    await client.close()
  }
}

main()
