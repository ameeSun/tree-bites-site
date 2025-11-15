import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';

interface FilterSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const priceRanges = ['$', '$$', '$$$', '$$$$'];
const ratings = [3, 3.5, 4, 4.5];

export function FilterSheet({ open, onOpenChange }: FilterSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[80vh]">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        
        <div className="py-6 space-y-6">
          {/* Distance */}
          <div>
            <Label className="mb-3 block">Distance (miles)</Label>
            <Slider defaultValue={[2]} max={10} step={0.5} className="mb-2" />
            <p className="text-sm text-gray-500">Within 2 miles</p>
          </div>

          {/* Price Range */}
          <div>
            <Label className="mb-3 block">Price Range</Label>
            <div className="flex gap-2">
              {priceRanges.map((price) => (
                <Badge
                  key={price}
                  variant="outline"
                  className="cursor-pointer px-4 py-2"
                >
                  {price}
                </Badge>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div>
            <Label className="mb-3 block">Minimum Rating</Label>
            <div className="flex gap-2">
              {ratings.map((rating) => (
                <Badge
                  key={rating}
                  variant="outline"
                  className="cursor-pointer px-4 py-2"
                >
                  {rating}+
                </Badge>
              ))}
            </div>
          </div>

          {/* Open Now */}
          <div>
            <Label className="mb-3 block">Availability</Label>
            <div className="flex gap-2">
              <Badge variant="outline" className="cursor-pointer px-4 py-2">
                Open Now
              </Badge>
              <Badge variant="outline" className="cursor-pointer px-4 py-2">
                Accepting Reservations
              </Badge>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t flex gap-3">
          <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
            Clear All
          </Button>
          <Button className="flex-1" onClick={() => onOpenChange(false)}>
            Apply Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
