import java.util.*;

public class q2 {
    public static void main(String args[]){
        Scanner sc= new Scanner(System.in);
        int m =sc.nextInt();
        LinkedList <Integer> list1= new LinkedList<>();
        for(int i=0;i<m; i++){
            list1.add(sc.nextInt());
        }
        int n =sc.nextInt();
        LinkedList <Integer> list2= new LinkedList<>();
        for(int i=0;i<n; i++){
            list2.add(sc.nextInt());
        }
        LinkedList <Integer> merged= new LinkedList<>();
        int i=0,j=0;
        while( i<list1.size() && j<list2.size()){
            if(list1.get(i)<=list2.get(j)){
                merged.add(list1.get(i));
                i++;
            }else{
                merged.add(list2.get(j));
                j++;
            }
        }
        while(i<list1.size()){
            merged.add(list1.get(i));
            i++;
        }
        while(j<list2.size()){
            merged.add(list2.get(j));
            j++;
        }
        for( int val: merged){
            System.out.print(val+" ");
        }
    }
}