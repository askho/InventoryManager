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

    public partial class EventsItemUsage
    {
        [Key]
        public string itemName { get; set; }
        public Nullable<decimal> price { get; set; }
        public int eventID { get; set; }
        public Nullable<int> checkedOut { get; set; }
        public Nullable<int> distributedToMember { get; set; }
    }
}
