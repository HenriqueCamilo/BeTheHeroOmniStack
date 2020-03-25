const connection = require('../database/connection');

module.exports = {


    //LISTA TODOS OS CASOS
    async index(request, response){

        const{page = 1} = request.query;//inicia a pagina 1

        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5) //pega 5 casos, os 5 primeiro na pagina 1 e do 6 ao 10 na pagina 2
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);

            response.header('X-Total-Count', count['count(*)']);
        return response.json({incidents});
    },


    //CRIA CASOS
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

    //DELETA CASO ESPECIFICO DA ONG
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