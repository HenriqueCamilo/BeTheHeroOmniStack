const connection = require('../database/connection');

module.exports = {

    async index(request, response){
        const incidents = await connection('incidents').select('*');
        return response.json({incidents});
    },

    async create(request, response){
        const { title, description, value} = request.body;

        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });
        
        return response.json({ id })
    },

    async delete(request, response){
        const {id} = request.params; // Buscou o id do que precisa ser deletado
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id').first();  //pegou o primeiro registro que possui o id igual o id 

        if(incident.ong_id != ong_id){
            return response.status(401).json({ error: 'Operation not permitted.'});
        }else{
            await connection('incidents').where('id', id).delete();//deleta o registro
            return response.status(204).send();
        }
    }
};