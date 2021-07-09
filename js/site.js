function calcularHorarioFinalDaJornada() {
    moment.locale('pt-br');
    var inicioJornada = moment('2021-07-08');
    let tempoTotalDeJornada = document.getElementById('tempoTotal').value;

    const intervalo = 60;

    let horarioInicial = document.getElementById('horaInicial').value;
    let [horaInicial, minutoInicial] = horarioInicial.split(':');

    inicioJornada.add(minutoInicial, 'minutes')
    inicioJornada.add(horaInicial, 'hour')

    let diferencaHorario = 0;
    let horarioFinalDaJornada = 0;

    let [horasParaAcrescentar, minutosParaAcrescentar] = tempoTotalDeJornada.split(':');

    let fimJornada = inicioJornada;
    let jornadaReduzia = false;
    let umaHoraEquivaleA = 60;

    while (horasParaAcrescentar > 0 || minutosParaAcrescentar > 0) {

        if (!jornadaReduzia) {
            if (fimJornada.hour() >= 22 || fimJornada.hour() < 5) {
                jornadaReduzia = true;
                umaHoraEquivaleA = 52.5;
            }
        }

        if (horasParaAcrescentar > 0) {
            fimJornada.add(umaHoraEquivaleA, 'minutes');
            horasParaAcrescentar--;
        } else {
            if (jornadaReduzia) {
                minutosParaAcrescentar = Number(minutosParaAcrescentar) - (Number(minutosParaAcrescentar) * 0.125);
            }
            fimJornada.add(minutosParaAcrescentar, 'minutes');
            minutosParaAcrescentar = 0;
        }
    }

    if (document.getElementById('adicionarIntervalo').checked) {
        let intervalo = Number($('#minutos-de-intervalo').val());
        fimJornada.add(intervalo, 'minutes');
    }

    document.getElementById('finalDaJornada').value = fimJornada.format('LTS');;
    console.log(fimJornada);
}

function OnChangeCheckAdicionarIntervalo() {

    if (document.getElementById('adicionarIntervalo').checked) {
        $('#minutos-de-intervalo').prop('disabled', false);
    } else {
        $('#minutos-de-intervalo').prop('disabled', true).val(0);

    }
}