export default function getStatus(status) {
    let newStatus = {
        badge: '',
        text: ''
    }
    if (status === 'Disponível') {
        newStatus.badge = 'success'
        newStatus.text = 'Disponível'
        newStatus.open = true
    }
    if (status === 'Em andamento') {
        newStatus.badge = 'warning'
        newStatus.text = 'Em andamento'
        newStatus.pending = true
    }
    if (status === 'Finalizado') {
        newStatus.badge = 'danger'
        newStatus.text = 'Finalizado'
    }
    if (status === 'Cancelado') {
        newStatus.badge = 'dark'
        newStatus.text = 'Cancelado'
    }
    return newStatus
}