//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace oDataService.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public partial class EventItemsDistributed
    {
        public int eventID { get; set; }
        [Key]
        public Nullable<int> memberID { get; set; }
        public string name { get; set; }
        public Nullable<int> checkedOut { get; set; }
    }
}