const Support = require('../models/Support');

class SupportController {
    // Cria uma nova solicitação de suporte
    static async createSupportRequest(req, res) {
        const { userName, userEmail, supportType, description } = req.body;

        try {
            const supportRequest = await Support.create({
                user_name: userName,
                user_email: userEmail,
                support_type: supportType,
                description: description
            });

            res.status(201).json({ success: true, message: 'Solicitação de suporte criada com sucesso!', id: supportRequest.id });
        } catch (error) {
            console.error('Erro ao criar solicitação de suporte:', error);
            res.status(500).json({ success: false, message: 'Erro ao criar solicitação de suporte.' });
        }
    }

    // Lista todas as solicitações de suporte
    static async listSupportRequests(req, res) {
        try {
            const supportRequests = await Support.list();
            res.status(200).json({ success: true, supportRequests });
        } catch (error) {
            console.error('Erro ao listar solicitações de suporte:', error);
            res.status(500).json({ success: false, message: 'Erro ao listar solicitações de suporte.' });
        }
    }

    // Atualiza o status de uma solicitação de suporte
    static async updateSupportStatus(req, res) {
        const { id, status } = req.body;

        try {
            await Support.updateStatus(id, status);
            res.status(200).json({ success: true, message: 'Status da solicitação atualizado com sucesso.' });
        } catch (error) {
            console.error('Erro ao atualizar status da solicitação:', error);
            res.status(500).json({ success: false, message: 'Erro ao atualizar status da solicitação.' });
        }
    }
}

module.exports = SupportController;
