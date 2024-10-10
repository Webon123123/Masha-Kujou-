function _0x31ac(_0x16c31d, _0x391554) {
    const _0x14c2c6 = _0x14c2();
    return _0x31ac = function (_0x31ac59, _0x41e1db) {
        _0x31ac59 = _0x31ac59 - 0x1b1;
        let _0x1c6184 = _0x14c2c6[_0x31ac59];
        return _0x1c6184;
    }, _0x31ac(_0x16c31d, _0x391554);
}
const _0x34771d = _0x31ac;
(function (_0x8d3321, _0x5019dd) {
    const _0x36e927 = _0x31ac
        , _0x211e28 = _0x8d3321();
    while (!![]) {
        try {
            const _0x500528 = parseInt(_0x36e927(0x1ca)) / 0x1 + -parseInt(_0x36e927(0x1b4)) / 0x2 + -parseInt(_0x36e927(0x1b9)) / 0x3 + parseInt(_0x36e927(0x1c3)) / 0x4 * (-parseInt(_0x36e927(0x1b6)) / 0x5) + -parseInt(_0x36e927(0x1cc)) / 0x6 * (-parseInt(_0x36e927(0x1cd)) / 0x7) + parseInt(_0x36e927(0x1d0)) / 0x8 * (parseInt(_0x36e927(0x1ce)) / 0x9) + -parseInt(_0x36e927(0x1bd)) / 0xa * (-parseInt(_0x36e927(0x1b5)) / 0xb);
            if (_0x500528 === _0x5019dd) break;
            else _0x211e28['push'](_0x211e28['shift']());
        } catch (_0x9b5c64) {
            _0x211e28['push'](_0x211e28['shift']());
        }
    }
}(_0x14c2, 0xb4aad));

let handler = async (_0x55976e, {
    conn: _0x14ced5,
    args: _0x4bb196,
    isOwner: _0x5a3d5e
}) => {
    const _0x2359c0 = _0x31ac;
    try {
        if (!_0x5a3d5e) return _0x55976e.reply('🚫 Solo el propietario puede cambiar el nombre del bot.');
        if (!_0x4bb196 || _0x4bb196.length < 1) return _0x55976e.reply('❌ Debes proporcionar un nuevo nombre para el bot.');

        let newName = _0x4bb196.join(' ');
        await _0x14ced5.updateProfileName(newName);
        await _0x55976e.reply(`✅ El nombre del bot ha sido cambiado a *${newName}* con éxito.`);
    } catch (error) {
        console.error(error);
        return _0x55976e.reply('❌ Hubo un error al cambiar el nombre del bot.');
    }
};

handler.command = ['setnamebot'];
handler.owner = true;

export default handler;

function _0x14c2() {
    const _0x1897e4 = ['🚫 Solo el propietario puede cambiar el nombre del bot.', '❌ Debes proporcionar un nuevo nombre para el bot.', '✅ El nombre del bot ha sido cambiado con éxito.', '❌ Hubo un error al cambiar el nombre del bot.'];
    _0x14c2 = function () {
        return _0x1897e4;
    };
    return _0x14c2();
}