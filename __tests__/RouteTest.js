const supertest = require('supertest');
const { app, server } = require('../Server')
const request = supertest(app)
const Routes = require('../routes/Routes')

const { connectDB, disconnectDB } = require('../MongoDbTestManager')

describe('API route test', () => {
      beforeAll(() => {
        connectDB()
      })
    
      afterAll(() => {
        disconnectDB();
        server.close();
      });
    
      describe('GET /', () => {
          it('base route returns success', async () => {
            const res = await request.get(Routes.ROOT);
            expect(res.status).toBe(200);
          });
        }
      )
  }
)