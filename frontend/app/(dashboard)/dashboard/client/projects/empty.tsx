export default function EmptyProject() {
   return (
      <div className="flex mt-6 min-h-48 items-center justify-center rounded-xl border border-dashed">
         <div className="text-center">
            <h3 className="text-sm font-medium">
               No projects yet
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
               Your active projects will appear here.
            </p>
         </div>
      </div>
   )
}
