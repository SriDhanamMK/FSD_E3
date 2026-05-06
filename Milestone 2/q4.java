import java.util.*;
public class Main {
    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        int N=sc.nextInt(); sc.nextLine();           // number of names
        ArrayList<String> names=new ArrayList<>();
        for(int i=0;i<N;i++) names.add(sc.nextLine());

        String search=sc.nextLine();                 // name to search
        int count=0;
        if(names.equals(search)) count++;
        System.out.println(count);                   // frequency
    }
}
