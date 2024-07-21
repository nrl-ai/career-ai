import { IconArrowRight } from "@tabler/icons-react";

export function FinishedMessage() {
  return (
    <div className="mx-auto max-w-2xl px-4 mt-2">
      <div className="rounded-lg border bg-background p-4">
        <p className="leading-normal text-muted-foreground">
          You have finished your interviewing section. Check out the feedback and tips below to
          improve your interviewing skills.
        </p>
        <div className="flex items-center justify-center mt-2">
          <button
            className="inline-flex items-center justify-center rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow-md hover:bg-primary/90 h-8 px-4 py-2 w-[200px] mt-2 mx-auto"
            onClick={() => {
              window.location.reload();
            }}
          >
            <IconArrowRight className="mr-2" />
            Restart Interview
          </button>
        </div>
      </div>
    </div>
  );
}
