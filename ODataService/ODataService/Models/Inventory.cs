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
    
    public partial class Inventory
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Inventory()
        {
            this.EventInventories = new HashSet<EventInventory>();
        }
    
        public int inventoryID { get; set; }
        public int itemID { get; set; }
        public System.DateTime dateAdded { get; set; }
        public decimal condition { get; set; }
        public Nullable<decimal> price { get; set; }
        public string purchasedAt { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<EventInventory> EventInventories { get; set; }
        public virtual Item Item { get; set; }
    }
}