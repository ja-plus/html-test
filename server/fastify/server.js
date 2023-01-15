// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true });

const opts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          hello: { type: 'string' },
        },
      },
    },
  },
};
// Declare a route
fastify.get('/', opts, async (request, reply) => {
  // return { hello: 'world' };
  reply.send({ hello: 'world' });
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
