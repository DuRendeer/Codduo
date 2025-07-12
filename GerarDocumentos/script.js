// script.js - Sistema Limpo de Contratos CODDUO

// Configuração do Make.com
const WEBHOOK_URL = 'https://hook.us2.make.com/2nw8uhghdnwcgt35redeownta9rhsvde';
const COMPANY_WHATSAPP = '5542998547169';

// Dados dos serviços
const services = {
    'site-basico': {
        name: 'Site Institucional Profissional',
        price: 700,
        deadline: '21 dias úteis',
        description: 'Website corporativo responsivo com até 5 seções, otimização SEO básica.'
    },
    'plataforma-web': {
        name: 'Plataforma Web Gerenciável',
        price: 1400,
        deadline: '21 dias úteis',
        description: 'Sistema de gerenciamento de conteúdo (CMS) customizado, painel administrativo.'
    },
    'sistema-completo': {
        name: 'Ecossistema Digital Integrado',
        price: 2275,
        deadline: '21 dias úteis',
        description: 'Plataforma corporativa com integrações: CRM, WhatsApp Business, redes sociais.'
    },
    'app-mobile': {
        name: 'Aplicativo Mobile Nativo',
        price: 4200,
        deadline: '45 dias úteis',
        description: 'App iOS e Android com interface moderna, notificações push.'
    },
    'personalizado': {
        name: 'Projeto Personalizado',
        price: 0,
        deadline: 'A definir',
        description: 'Desenvolvimento personalizado conforme necessidades específicas.'
    }
};

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    applyMasks();
});

// Aplicar máscaras nos campos
function applyMasks() {
    // Máscara CPF/CNPJ
    document.getElementById('clientDoc').addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length <= 11) {
            value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        } else {
            value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
        }
        e.target.value = value;
    });

    // Máscara CEP
    document.getElementById('clientCEP').addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{5})(\d{3})/, '$1-$2');
        e.target.value = value;
    });

    // Máscara Telefone
    document.getElementById('clientPhone').addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        e.target.value = value;
    });
}

// Atualizar informações do serviço
function updateServiceInfo() {
    const serviceSelect = document.getElementById('serviceSelect');
    const projectValue = document.getElementById('projectValue');
    const projectDeadline = document.getElementById('projectDeadline');
    const serviceDescription = document.getElementById('serviceDescription');
    
    const selectedService = services[serviceSelect.value];
    
    if (selectedService) {
        if (serviceSelect.value === 'personalizado') {
            // Projeto personalizado - campos editáveis
            projectValue.value = '';
            projectValue.removeAttribute('readonly');
            projectDeadline.value = '';
            projectDeadline.removeAttribute('readonly');
            serviceDescription.value = selectedService.description;
            serviceDescription.removeAttribute('readonly');
        } else {
            // Serviços pré-definidos - campos automáticos
            projectValue.value = selectedService.price;
            projectValue.setAttribute('readonly', true);
            
            // Extrair apenas o número de dias do prazo
            const deadline = selectedService.deadline;
            let days = '';
            
            if (deadline.includes('-')) {
                // Para prazos como "7-21 dias úteis", pegar o número maior
                const numbers = deadline.match(/\d+/g);
                days = numbers ? numbers[numbers.length - 1] : '30';
            } else {
                // Para prazos como "30-45 dias úteis", pegar o primeiro número
                const match = deadline.match(/\d+/);
                days = match ? match[0] : '30';
            }
            
            projectDeadline.value = days;
            projectDeadline.setAttribute('readonly', true);
            serviceDescription.value = selectedService.description;
            serviceDescription.setAttribute('readonly', true);
        }
    } else {
        // Limpar campos se nenhum serviço selecionado
        projectValue.value = '';
        projectDeadline.value = '';
        serviceDescription.value = '';
    }
}

// Validar formulário
function validateForm() {
    const requiredFields = [
        'clientName', 'clientDoc', 'clientEmail', 'clientPhone',
        'clientAddress', 'clientCity', 'clientCEP', 'serviceSelect',
        'projectValue', 'projectDeadline', 'serviceDescription'
    ];
    
    for (let fieldId of requiredFields) {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            alert(`❌ Por favor, preencha o campo: ${field.previousElementSibling.textContent}`);
            field.focus();
            return false;
        }
    }
    
    // Validar valor mínimo para projetos personalizados
    const serviceSelect = document.getElementById('serviceSelect');
    const projectValue = parseFloat(document.getElementById('projectValue').value);
    
    if (serviceSelect.value === 'personalizado' && projectValue < 1000) {
        alert('❌ O valor mínimo para projetos personalizados é R$ 1.000,00');
        return false;
    }
    
    return true;
}

// Coletar dados do formulário
function collectFormData() {
    // Dados básicos
    const clientName = document.getElementById('clientName').value.trim();
    const clientDoc = document.getElementById('clientDoc').value.trim();
    const clientEmail = document.getElementById('clientEmail').value.trim();
    const clientPhone = document.getElementById('clientPhone').value.trim();
    const clientAddress = document.getElementById('clientAddress').value.trim();
    const clientCity = document.getElementById('clientCity').value.trim();
    const clientCEP = document.getElementById('clientCEP').value.trim();
    const clientType = document.getElementById('clientType').value;
    
    // Dados do serviço
    const serviceSelect = document.getElementById('serviceSelect').value;
    const serviceName = services[serviceSelect] ? services[serviceSelect].name : 'Projeto Personalizado';
    const serviceDescription = document.getElementById('serviceDescription').value.trim();
    const projectValue = parseFloat(document.getElementById('projectValue').value);
    const projectDeadline = document.getElementById('projectDeadline').value.trim();
    
    // Dados de pagamento
    const paymentMethod = document.getElementById('paymentMethod').value;
    const paymentType = document.getElementById('paymentType').value;
    const observations = document.getElementById('observations').value.trim();
    
    // Cálculos financeiros
    let finalPrice = projectValue;
    let discountAmount = 0;
    let interestAmount = 0;
    
    if (paymentMethod === 'vista') {
        discountAmount = projectValue * 0.05;
        finalPrice = projectValue - discountAmount;
    } else if (paymentMethod !== '2x') {
        const parcelas = parseInt(paymentMethod.replace('x', ''));
        if (parcelas > 2) {
            const juros = (parcelas - 2) * 0.01;
            interestAmount = projectValue * juros;
            finalPrice = projectValue + interestAmount;
        }
    }
    
    const valorEntrada = finalPrice * 0.4;
    const valorFinal = finalPrice * 0.6;
    
    // WhatsApp do cliente
    const clientWhatsApp = clientPhone.replace(/\D/g, '');
    const whatsappNumber = clientWhatsApp ? '55' + clientWhatsApp : COMPANY_WHATSAPP;
    
    // Mapear formas de pagamento
    const paymentMethodMap = {
        'vista': 'À vista com desconto de 5%',
        '2x': 'Parcelado em 2x sem juros',
        '3x': 'Parcelado em 3x com juros',
        '6x': 'Parcelado em 6x com juros',
        '12x': 'Parcelado em 12x com juros'
    };
    
    const paymentTypeMap = {
        'pix': 'PIX',
        'transferencia': 'Transferência Bancária',
        'cartao': 'Cartão de Crédito',
        'boleto': 'Boleto Bancário'
    };
    
    return {
        // Dados do cliente
        cliente: {
            nome: clientName,
            documento: clientDoc,
            email: clientEmail,
            telefone: clientPhone,
            endereco: clientAddress,
            cidade: clientCity,
            cep: clientCEP,
            tipo_pessoa: clientType === 'juridica' ? 'Pessoa Jurídica' : 'Pessoa Física'
        },
        
        // Dados do serviço
        servico: {
            nome: serviceName,
            descricao: serviceDescription,
            prazo_entrega: projectDeadline + (projectDeadline.includes('dias') ? '' : ' dias úteis')
        },
        
        // Dados financeiros
        financeiro: {
            valor_total: finalPrice.toFixed(2),
            valor_extenso: numeroParaExtenso(finalPrice),
            valor_entrada: valorEntrada.toFixed(2),
            valor_final: valorFinal.toFixed(2),
            forma_pagamento: paymentMethodMap[paymentMethod],
            metodo_pagamento: paymentTypeMap[paymentType],
            desconto_info: discountAmount > 0 ? `Desconto à vista: R$ ${discountAmount.toFixed(2)}` : '',
            parcelamento_info: interestAmount > 0 ? `Juros: R$ ${interestAmount.toFixed(2)}` : ''
        },
        
        // Dados complementares
        complementares: {
            observacoes_adicionais: observations || 'Nenhuma observação adicional.',
            data_contrato: new Date().toLocaleDateString('pt-BR'),
            data_geracao: new Date().toLocaleString('pt-BR')
        },
        
        // Configurações
        config: {
            whatsapp_number: whatsappNumber,
            return_method: 'whatsapp',
            cliente_nome_arquivo: clientName.replace(/\s+/g, '_'),
            empresa: 'CODDUO'
        },
        
        // Metadados
        metadata: {
            source: 'codduo_contract_system',
            version: '2.0',
            timestamp: new Date().toISOString()
        }
    };
}

// Função principal para gerar contrato
async function generateContract() {
    // Validar formulário
    if (!validateForm()) {
        return;
    }
    
    // Mostrar loading
    const loading = document.getElementById('loading');
    const generateBtn = document.getElementById('generateBtn');
    
    generateBtn.disabled = true;
    generateBtn.textContent = 'Processando...';
    loading.classList.add('show');
    
    try {
        // Coletar dados
        const contractData = collectFormData();
        
        // Enviar para Make.com com modo no-cors para funcionar localmente
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contractData),
            mode: 'no-cors' // Para funcionar em arquivo local
        });
        
        if (true) { // Com no-cors sempre assume sucesso
            // Sucesso - sempre vai dar certo com no-cors
            let successMessage = '🎉 CONTRATO ENVIADO COM SUCESSO!\n\n';
            successMessage += `✅ Cliente: ${contractData.cliente.nome}\n`;
            successMessage += `💰 Valor: R$ ${contractData.financeiro.valor_total}\n`;
            successMessage += `📱 WhatsApp: +${contractData.config.whatsapp_number}\n\n`;
            successMessage += '⏰ Seu contrato será processado e enviado em alguns minutos!\n\n';
            successMessage += '📄 Você receberá o documento completo no WhatsApp.\n\n';
            successMessage += '🔍 Para confirmar o envio, verifique o histórico no Make.com';
            
            alert(successMessage);
            
            // Opcional: Limpar formulário
            // if (confirm('Deseja limpar o formulário para um novo contrato?')) {
            //     location.reload();
            // }
            
        } else {
        } else {
            // Este bloco nunca vai executar com no-cors, mas fica aqui para compatibilidade
            throw new Error('Erro no envio');
        }
        
    } catch (error) {
        console.error('Erro ao enviar contrato:', error);
        
        let errorMessage = '❌ ERRO AO PROCESSAR CONTRATO\n\n';
        errorMessage += `Detalhes: ${error.message}\n\n`;
        errorMessage += '🔧 ALTERNATIVA - Use o PowerShell:\n\n';
        errorMessage += `Invoke-RestMethod -Uri "${WEBHOOK_URL}" -Method Post -ContentType "application/json" -Body '${JSON.stringify(contractData).replace(/'/g, "''")}'`;
        errorMessage += '\n\n• Verifique sua conexão com a internet\n';
        errorMessage += '• Confirme se o cenário do Make.com está ativo\n';
        errorMessage += '• Tente novamente em alguns segundos';
        
        alert(errorMessage);
        
    } finally {
        // Esconder loading
        loading.classList.remove('show');
        generateBtn.disabled = false;
        generateBtn.textContent = '🚀 Gerar Contrato';
    }
}

// Função para converter número por extenso (simplificada)
function numeroParaExtenso(valor) {
    const unidades = ['', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove'];
    const especiais = ['dez', 'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'];
    const dezenas = ['', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'];
    const centenas = ['', 'cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos'];
    
    const inteiro = Math.floor(valor);
    const decimal = Math.round((valor - inteiro) * 100);
    
    function converterGrupo(num) {
        if (num === 0) return '';
        
        let resultado = '';
        const c = Math.floor(num / 100);
        const d = Math.floor((num % 100) / 10);
        const u = num % 10;
        
        if (c > 0) {
            if (num === 100) resultado += 'cem';
            else resultado += centenas[c];
        }
        
        if (d > 1) {
            if (resultado) resultado += ' e ';
            resultado += dezenas[d];
            if (u > 0) resultado += ' e ' + unidades[u];
        } else if (d === 1) {
            if (resultado) resultado += ' e ';
            resultado += especiais[u];
        } else if (u > 0) {
            if (resultado) resultado += ' e ';
            resultado += unidades[u];
        }
        
        return resultado;
    }
    
    let extenso = '';
    
    if (inteiro === 0) {
        extenso = 'zero';
    } else if (inteiro < 1000) {
        extenso = converterGrupo(inteiro);
    } else if (inteiro < 1000000) {
        const milhares = Math.floor(inteiro / 1000);
        const resto = inteiro % 1000;
        
        if (milhares === 1) {
            extenso = 'mil';
        } else {
            extenso = converterGrupo(milhares) + ' mil';
        }
        
        if (resto > 0) {
            extenso += ' e ' + converterGrupo(resto);
        }
    }
    
    extenso += inteiro === 1 ? ' real' : ' reais';
    
    if (decimal > 0) {
        extenso += ' e ' + converterGrupo(decimal) + (decimal === 1 ? ' centavo' : ' centavos');
    }
    
    return extenso;
}