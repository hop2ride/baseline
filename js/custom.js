$(document).ready(function(){   
        	
        	  $('#daydatepicker').Zebra_DatePicker();
        	    $('#weekdatepicker').Zebra_DatePicker(
        	    		
        	    		{
        	    			
        	        direction: 0,
        	        disabled_dates: ['* * * *'],
        	        enabled_dates: ['* * * 0,0'],
        	        show_other_months: true,
        	        select_other_months: true
        	    } );
        	    
        	    $('#monthdatepicker').Zebra_DatePicker({
        	        format: 'm, Y'
        	    });
	});