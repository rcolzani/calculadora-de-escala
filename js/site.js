function calcularHorarioFinalDaJornada() {
    var inicioJornada = moment('2021-07-08');
    let tempoTotalDeJornada = document.getElementById('tempoTotal').value;

    let intervalo= 60;

    let horarioInicial = document.getElementById('horaInicial').value;
    let [horaInicial, minutoInicial] = horarioInicial.split(':');
    
    inicioJornada.add(minutoInicial, 'minutes')
    inicioJornada.add(horaInicial, 'hour')

    let diferencaHorario = 0;
    let horarioFinalDaJornada = 0;

    let [horasParaAcrescentar ,minutosParaAcrescentar] = tempoTotalDeJornada.split(':');

    let fimJornada = inicioJornada;

    while(horasParaAcrescentar > 0 || minutosParaAcrescentar>0){
        let umaHoraEquivaleA = 60;
        let jornadaReduzia = false;

        if(fimJornada.hour() >= 21 || fimJornada.hour() < 5){
            jornadaReduzia = true;
            umaHoraEquivaleA = 52.5;
        }
        
        if(horasParaAcrescentar > 0){
            fimJornada.add(umaHoraEquivaleA, 'minutes');
            horasParaAcrescentar --;
        }else{
            if (jornadaReduzia){
                minutosParaAcrescentar = Number(minutosParaAcrescentar) -(Number(minutosParaAcrescentar) * 0.125);
            }
            fimJornada.add(minutosParaAcrescentar, 'minutes');
            minutosParaAcrescentar =0;
        }
    }

    fimJornada.add(intervalo, 'minutes');
    document.getElementById('finalDaJornada').value = fimJornada.format('LTS');;
    console.log(fimJornada);
}