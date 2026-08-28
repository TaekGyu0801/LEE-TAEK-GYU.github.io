set mydata [load_file n62_des.tdr]
set myplot [create_plot -1d]
set mycurve [create_curve -axisX X -axisY hDensity -dataset $mydata -plot $myplot]

set xs [get_curve_data $mycurve -axisX]
set ys [get_curve_data $mycurve -axisY]

set best 0
set bestd 1e99

for {set i 0} {$i < [llength $xs]} {incr i} {
    set d [expr {abs([lindex $xs $i] - 0.05)}]
    if {$d < $bestd} {
        set bestd $d
        set best $i
    }
}

puts "================================"
puts "X = [lindex $xs $best]"
puts "hDensity = [lindex $ys $best]"
puts "================================"

exit 0
