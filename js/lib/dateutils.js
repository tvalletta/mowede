define([], function(){
    //enhances the built in Date object.

    //calculate the number of days between two dates
    Date.prototype.dayDiff = function(d2) {
        var d = Math.abs(this - d2);
        return Math.floor(d / (24 * 60 * 60 * 1000));
    };

    //calculate the number of business days between two dates
    Date.prototype.busDayDiff = function(d2) {
        var d = this.dayDiff(d2);
        var t = d % 7;
        if (this < d2) {
            w1 = this.getDay();
            w2 = d2.getDay();
        }
        else {
            w2 = this.getDay();
            w1 = d2.getDay();
        }
        if (w1 > w2) t -= 2;
        if ((w1 == 0 && w2 == 6) || w1 == 6) t--;
        return Math.abs((Math.floor(d / 7) * 5) + t);
    };
});